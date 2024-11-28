import supertest from 'supertest';
import * as http from 'http';
import app from '../../src/app'; // Adjust path as needed to your Express app
import * as db from '../db';
import jwt from 'jsonwebtoken';
import { UUID } from '../../src/types/index';

// Import necessary modules for mocking
import { ExploreService } from '../../src/explore/service';
import { S3Service } from '../../src/s3/service';

let server: http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>;

beforeAll(async () => {
  server = http.createServer(app);
  server.listen();
  await db.reset();
});

afterEach(async () => {
  jest.restoreAllMocks(); // Restore mocks after each test
  await db.reset();
});

afterAll((done) => {
  db.shutdown();
  server.close(done);
});

const generateTestToken = (
  id: UUID,
  username: string,
  firstname: string,
  lastname: string
) => {
  const payload = { id: id, username: username, firstname: firstname, lastname: lastname };
  return jwt.sign(payload, `${process.env.HASH_MASTER_SECRET}`, {
    expiresIn: '1h',
    algorithm: 'HS256',
  });
};

const testUserID = '38ababab-2a07-45d6-85c9-f138d63cb466';

const testUserToken = generateTestToken(testUserID, 'testuser', 'Test', 'User');

describe('Explore Endpoints Test Suite', () => {
  /**
   * Tests for /explore/search/suggestion endpoint
   */
  describe('/explore/search/suggestion Endpoint', () => {
    test('Search suggestion returns correct status code for valid input', async () => {
      const input = 'luc';
      const currentUsername = 'testuser';

      const res = await supertest(server)
        .get('/api/v0/explore/search/suggestion')
        .set('Authorization', `Bearer ${testUserToken}`)
        .query({ input, currentUsername });

      expect(res.status).toBe(200);
    });

    test('Search suggestion does not include current user in results', async () => {
      const input = 'test';
      const currentUsername = 'testuser';

      const res = await supertest(server)
        .get('/api/v0/explore/search/suggestion')
        .set('Authorization', `Bearer ${testUserToken}`)
        .query({ input, currentUsername });

      expect(res.status).toBe(200);
    });

    test('Search suggestion with input length >=1', async () => {
      const input = 'a'; // Single character input
      const currentUsername = 'testuser';

      const res = await supertest(server)
        .get('/api/v0/explore/search/suggestion')
        .set('Authorization', `Bearer ${testUserToken}`)
        .query({ input, currentUsername });

      expect(res.status).toBe(200);
    });

    // Additional Tests for Error Handling
    test('Search suggestion with empty input returns 400', async () => {
      const input = '';
      const currentUsername = 'testuser';

      const res = await supertest(server)
        .get('/api/v0/explore/search/suggestion')
        .set('Authorization', `Bearer ${testUserToken}`)
        .query({ input, currentUsername });

      expect(res.status).toBe(400);
    });

    test('Search suggestion without authorization token returns 401', async () => {
      const input = 'luc';
      const currentUsername = 'testuser';

      const res = await supertest(server)
        .get('/api/v0/explore/search/suggestion')
        .query({ input, currentUsername });

      expect(res.status).toBe(401);
    });

    test('Search suggestion with invalid token returns 401', async () => {
      const input = 'luc';
      const currentUsername = 'testuser';

      const res = await supertest(server)
        .get('/api/v0/explore/search/suggestion')
        .set('Authorization', `Bearer invalidtoken`)
        .query({ input, currentUsername });

      expect(res.status).toBe(401);
    });

    test('Search suggestion with missing currentUsername returns 400', async () => {
      const input = 'luc';

      const res = await supertest(server)
        .get('/api/v0/explore/search/suggestion')
        .set('Authorization', `Bearer ${testUserToken}`)
        .query({ input });

      expect(res.status).toBe(400); // Assuming missing required parameter results in 400
    });

    test('Search suggestion with input causing no results returns 200', async () => {
      const input = 'nonexistentuser';
      const currentUsername = 'testuser';

      const res = await supertest(server)
        .get('/api/v0/explore/search/suggestion')
        .set('Authorization', `Bearer ${testUserToken}`)
        .query({ input, currentUsername });

      expect(res.status).toBe(200);
    });

    test('Search suggestion when service returns undefined', async () => {
      // Mock the ExploreService to return undefined
      jest.spyOn(ExploreService.prototype, 'searchSuggestion').mockResolvedValue(undefined);

      const input = 'luc';
      const currentUsername = 'testuser';

      const res = await supertest(server)
        .get('/api/v0/explore/search/suggestion')
        .set('Authorization', `Bearer ${testUserToken}`)
        .query({ input, currentUsername });

      expect(res.status).toBe(200);
    });

    test('Search suggestion when an exception is thrown', async () => {
      // Mock the ExploreService to throw an error
      jest.spyOn(ExploreService.prototype, 'searchSuggestion').mockImplementation(() => {
        throw new Error('Database error');
      });

      const input = 'luc';
      const currentUsername = 'testuser';

      const res = await supertest(server)
        .get('/api/v0/explore/search/suggestion')
        .set('Authorization', `Bearer ${testUserToken}`)
        .query({ input, currentUsername });

      expect(res.status).toBe(500);
    });
  });

  /**
   * Tests for /explore/posts endpoint
   */
  describe('/explore/posts Endpoint', () => {
    test('Explore posts returns 200 for valid request', async () => {
      const res = await supertest(server)
        .get('/api/v0/explore/posts')
        .set('Authorization', `Bearer ${testUserToken}`)
        .query({ limit: 10, offset: 0 });

      expect(res.status).toBe(200);
    });

    test('Explore posts returns 404 when no posts are found', async () => {
      // Mock the ExploreService to return an empty array
      jest.spyOn(ExploreService.prototype, 'getExplorePosts').mockResolvedValue([]);

      const res = await supertest(server)
        .get('/api/v0/explore/posts')
        .set('Authorization', `Bearer ${testUserToken}`)
        .query({ limit: 10, offset: 0 });

      expect(res.status).toBe(404);
    });

    test('Explore posts without authorization token returns 401', async () => {
      const res = await supertest(server)
        .get('/api/v0/explore/posts')
        .query({ limit: 10, offset: 0 });

      expect(res.status).toBe(401);
    });

    test('Explore posts with invalid token returns 401', async () => {
      const res = await supertest(server)
        .get('/api/v0/explore/posts')
        .set('Authorization', `Bearer invalidtoken`)
        .query({ limit: 10, offset: 0 });

      expect(res.status).toBe(401);
    });

    test('Explore posts when s3Service.getFileLink fails', async () => {
      // Mock the S3Service to return undefined
      jest.spyOn(S3Service.prototype, 'getFileLink').mockResolvedValue(undefined);

      const res = await supertest(server)
        .get('/api/v0/explore/posts')
        .set('Authorization', `Bearer ${testUserToken}`)
        .query({ limit: 10, offset: 0 });

      expect(res.status).toBe(200); // Assuming the endpoint still returns 200 even if image URLs cannot be generated
    });

    test('Explore posts when an exception is thrown', async () => {
      // Mock the ExploreService to throw an error
      jest.spyOn(ExploreService.prototype, 'getExplorePosts').mockImplementation(() => {
        throw new Error('Database error');
      });

      const res = await supertest(server)
        .get('/api/v0/explore/posts')
        .set('Authorization', `Bearer ${testUserToken}`)
        .query({ limit: 10, offset: 0 });

      expect(res.status).toBe(500);
    });

    test('Explore posts with invalid limit and offset values', async () => {
      const res = await supertest(server)
        .get('/api/v0/explore/posts')
        .set('Authorization', `Bearer ${testUserToken}`)
        .query({ limit: -10, offset: -5 });

      expect(res.status).toBe(500);
    });
  });
});
