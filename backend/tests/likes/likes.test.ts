import supertest from 'supertest';
import * as http from 'http';
import app from '../../src/app'; // Adjust path as needed to your Express app
import * as db from '../db';
import jwt from 'jsonwebtoken';
import { UUID } from '../../src/types/Index';

// Import necessary modules for mocking
import { likeService } from '../../src/likes/Service';

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

const lucaPostID = 'a5059ef4-971b-4e60-a692-a3af3365ba85'; // Post by Luca
const keatonPostID = 'a9359ef4-971b-4e60-a692-a3af3365ba85'; // Post by Keaton
const invalidPostID = 'invalid-post-id';

describe('Likes Endpoints Test Suite', () => {
  /**
   * Tests for /likes/add endpoint
   */
  describe('/likes/add Endpoint', () => {
    test('Add a like to a post returns 201', async () => {
      const res = await supertest(server)
        .post('/api/v0/likes/add')
        .set('Authorization', `Bearer ${testUserToken}`)
        .query({ post: lucaPostID });

      expect(res.status).toBe(201);
    });

    test('Add like without authorization token returns 401', async () => {
      const res = await supertest(server).post('/api/v0/likes/add').query({ post: lucaPostID });

      expect(res.status).toBe(401);
    });

    test('Add like with invalid token returns 401', async () => {
      const res = await supertest(server)
        .post('/api/v0/likes/add')
        .set('Authorization', `Bearer invalidtoken`)
        .query({ post: lucaPostID });

      expect(res.status).toBe(401);
    });

    test('Add like to invalid post ID returns 400', async () => {
      const res = await supertest(server)
        .post('/api/v0/likes/add')
        .set('Authorization', `Bearer ${testUserToken}`)
        .query({ post: invalidPostID });

      expect(res.status).toBe(400);
    });

    test('Add like that already exists returns 400', async () => {
      // First, add the like
      await supertest(server)
        .post('/api/v0/likes/add')
        .set('Authorization', `Bearer ${testUserToken}`)
        .query({ post: lucaPostID });

      // Try adding it again
      const res = await supertest(server)
        .post('/api/v0/likes/add')
        .set('Authorization', `Bearer ${testUserToken}`)
        .query({ post: lucaPostID });

      expect(res.status).toBe(400);
    });

    test('Add like when service returns undefined returns 400', async () => {
      // Mock the likeService to return undefined
      jest.spyOn(likeService.prototype, 'addLike').mockResolvedValue(undefined);

      const res = await supertest(server)
        .post('/api/v0/likes/add')
        .set('Authorization', `Bearer ${testUserToken}`)
        .query({ post: lucaPostID });

      expect(res.status).toBe(400);
    });

    test('Add like when an exception is thrown returns 500', async () => {
      // Mock the likeService to throw an error
      jest.spyOn(likeService.prototype, 'addLike').mockImplementation(() => {
        throw new Error('Database error');
      });

      const res = await supertest(server)
        .post('/api/v0/likes/add')
        .set('Authorization', `Bearer ${testUserToken}`)
        .query({ post: lucaPostID });

      expect(res.status).toBe(500);
    });
  });

  /**
   * Tests for /likes/remove endpoint
   */
  describe('/likes/remove Endpoint', () => {
    test('Remove a like from a post returns 204', async () => {
      // First, add a like
      await supertest(server)
        .post('/api/v0/likes/add')
        .set('Authorization', `Bearer ${testUserToken}`)
        .query({ post: lucaPostID });

      // Then, remove the like
      const res = await supertest(server)
        .delete('/api/v0/likes/remove')
        .set('Authorization', `Bearer ${testUserToken}`)
        .query({ post: lucaPostID });

      expect(res.status).toBe(204);
    });

    test('Remove like without authorization token returns 401', async () => {
      const res = await supertest(server)
        .delete('/api/v0/likes/remove')
        .query({ post: lucaPostID });

      expect(res.status).toBe(401);
    });

    test('Remove like with invalid token returns 401', async () => {
      const res = await supertest(server)
        .delete('/api/v0/likes/remove')
        .set('Authorization', `Bearer invalidtoken`)
        .query({ post: lucaPostID });

      expect(res.status).toBe(401);
    });

    test('Remove like from invalid post ID returns 400', async () => {
      const res = await supertest(server)
        .delete('/api/v0/likes/remove')
        .set('Authorization', `Bearer ${testUserToken}`)
        .query({ post: invalidPostID });

      expect(res.status).toBe(400);
    });

    test('Remove like that does not exist returns 400', async () => {
      // Attempt to remove a like that hasn't been added
      const res = await supertest(server)
        .delete('/api/v0/likes/remove')
        .set('Authorization', `Bearer ${testUserToken}`)
        .query({ post: lucaPostID });

      expect(res.status).toBe(400);
    });

    test('Remove like when service returns undefined returns 400', async () => {
      // Mock the likeService to return undefined
      jest.spyOn(likeService.prototype, 'removeLike').mockResolvedValue(undefined);

      const res = await supertest(server)
        .delete('/api/v0/likes/remove')
        .set('Authorization', `Bearer ${testUserToken}`)
        .query({ post: lucaPostID });

      expect(res.status).toBe(400);
    });

    test('Remove like when an exception is thrown returns 500', async () => {
      // Mock the likeService to throw an error
      jest.spyOn(likeService.prototype, 'removeLike').mockImplementation(() => {
        throw new Error('Database error');
      });

      const res = await supertest(server)
        .delete('/api/v0/likes/remove')
        .set('Authorization', `Bearer ${testUserToken}`)
        .query({ post: lucaPostID });

      expect(res.status).toBe(500);
    });
  });

  /**
   * Tests for /likes/getLikeCount endpoint
   */
  describe('/likes/getLikeCount Endpoint', () => {
    test('Get like count for a post returns 200', async () => {
      const res = await supertest(server)
        .get('/api/v0/likes/getLikeCount')
        .set('Authorization', `Bearer ${testUserToken}`)
        .query({ post: keatonPostID });

      expect(res.status).toBe(200);
    });

    test('Get like count without authorization token returns 401', async () => {
      const res = await supertest(server)
        .get('/api/v0/likes/getLikeCount')
        .query({ post: keatonPostID });

      expect(res.status).toBe(401);
    });

    test('Get like count with invalid token returns 401', async () => {
      const res = await supertest(server)
        .get('/api/v0/likes/getLikeCount')
        .set('Authorization', `Bearer invalidtoken`)
        .query({ post: keatonPostID });

      expect(res.status).toBe(401);
    });

    test('Get like count for invalid post ID returns 400', async () => {
      const res = await supertest(server)
        .get('/api/v0/likes/getLikeCount')
        .set('Authorization', `Bearer ${testUserToken}`)
        .query({ post: invalidPostID });

      expect(res.status).toBe(400);
    });

    test('Get like count when service returns undefined returns 400', async () => {
      // Mock the likeService to return undefined
      jest.spyOn(likeService.prototype, 'getLikeCount').mockResolvedValue(undefined);

      const res = await supertest(server)
        .get('/api/v0/likes/getLikeCount')
        .set('Authorization', `Bearer ${testUserToken}`)
        .query({ post: lucaPostID });

      expect(res.status).toBe(400);
    });

    test('Get like count when an exception is thrown returns 500', async () => {
      // Mock the likeService to throw an error
      jest.spyOn(likeService.prototype, 'getLikeCount').mockImplementation(() => {
        throw new Error('Database error');
      });    
      const res = await supertest(server)
        .get('/api/v0/likes/getLikeCount')
        .set('Authorization', `Bearer ${testUserToken}`)
        .query({ post: lucaPostID });

      expect(res.status).toBe(500);
    });
  });
});
