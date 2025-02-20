import supertest from 'supertest';
import * as http from 'http';
import app from '../../src/app';
import * as db from '../db';
import { S3Service } from '../../src/s3/Service';
import { toEatService } from '../../src/toEat/Service';
import jwt from 'jsonwebtoken';
import { UUID } from '../../src/types/Index';

let server: http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>;

beforeAll(async () => {
  server = http.createServer(app);
  server.listen();
  await db.reset();
});

beforeEach(async () => {
  jest.clearAllMocks();
  jest.spyOn(S3Service.prototype, 'getFileLink').mockImplementation(async (s3Key) => {
    // Return a mock URL for the given S3 key
    return 'https://mock-s3-url.com/' + s3Key;
  });
});

afterEach(async () => {
  jest.restoreAllMocks();
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
  return jwt.sign(payload, `${process.env.HASH_MASTER_SECRET}`, { expiresIn: '1h', algorithm: 'HS256' });
};

const lucaID = 'a3059ef4-971b-4e60-a692-a3af3365ba85';
const keatonID = '3b9a58b2-2a07-45d6-85c9-f138d63cb466';
const testUserID = '38ababab-2a07-45d6-85c9-f138d63cb466';

const lucaToken = generateTestToken(lucaID, 'lucaschram', 'Luca', 'Schram');
const keatonToken = generateTestToken(keatonID, 'keatonshawhan', 'Keaton', 'Shawhan');
const testUserToken = generateTestToken(testUserID, 'testuser', 'Test', 'User');

const lucaPostID = 'a5059ef4-971b-4e60-a692-a3af3365ba85'; // Post by Luca
const keatonPostID = 'a9359ef4-971b-4e60-a692-a3af3365ba85'; // Post by Keaton
const invalidPostID = 'invalid-post-id';

describe('toEat Endpoints Test Suite', () => {
  /**
   * Tests for /toEat/getList endpoint
   */
  describe('/toEat/getList Endpoint', () => {
    test('Get toEat list successfully', async () => {
      // First, Luca adds a post to his toEat list
      await supertest(server)
        .post('/api/v0/toEat/post')
        .set('Authorization', `Bearer ${lucaToken}`)
        .query({ postId: keatonPostID });

      const res = await supertest(server)
        .get('/api/v0/toEat/getList')
        .set('Authorization', `Bearer ${lucaToken}`);

      expect(res.status).toBe(200);
    });

    test('Get toEat list without authorization token returns 401', async () => {
      const res = await supertest(server)
        .get('/api/v0/toEat/getList');

      expect(res.status).toBe(401);
    });

    test('Get toEat list with invalid token returns 401', async () => {
      const res = await supertest(server)
        .get('/api/v0/toEat/getList')
        .set('Authorization', `Bearer invalidtoken`);

      expect(res.status).toBe(401);
    });

    test('Get toEat list when service returns undefined returns 400', async () => {
      jest.spyOn(toEatService.prototype, 'getToEatList').mockResolvedValue(undefined);

      const res = await supertest(server)
        .get('/api/v0/toEat/getList')
        .set('Authorization', `Bearer ${lucaToken}`);

      expect(res.status).toBe(400);
    });

    test('Get toEat list when S3Service.getFileLink fails returns 400', async () => {
      jest.spyOn(S3Service.prototype, 'getFileLink').mockResolvedValue(undefined);

      // First, Luca adds a post to his toEat list
      await supertest(server)
        .post('/api/v0/toEat/post')
        .set('Authorization', `Bearer ${lucaToken}`)
        .query({ postId: keatonPostID });

      const res = await supertest(server)
        .get('/api/v0/toEat/getList')
        .set('Authorization', `Bearer ${lucaToken}`);

      expect(res.status).toBe(400);
    });

    test('Get toEat list when an exception is thrown returns 500', async () => {
      jest.spyOn(toEatService.prototype, 'getToEatList').mockImplementation(() => {
        throw new Error('Database error');
      });

      const res = await supertest(server)
        .get('/api/v0/toEat/getList')
        .set('Authorization', `Bearer ${lucaToken}`);

      expect(res.status).toBe(500);
    });
  });

  /**
   * Tests for /toEat/post endpoint
   */
  describe('/toEat/post Endpoint', () => {
    test('Add a post to toEat list successfully', async () => {
      const res = await supertest(server)
        .post('/api/v0/toEat/post')
        .set('Authorization', `Bearer ${testUserToken}`)
        .query({ postId: keatonPostID });

      expect(res.status).toBe(200);
    });

    test('Add a post to toEat list without authorization token returns 401', async () => {
      const res = await supertest(server)
        .post('/api/v0/toEat/post')
        .query({ postId: keatonPostID });

      expect(res.status).toBe(401);
    });

    test('Add a post to toEat list with invalid token returns 401', async () => {
      const res = await supertest(server)
        .post('/api/v0/toEat/post')
        .set('Authorization', `Bearer invalidtoken`)
        .query({ postId: keatonPostID });

      expect(res.status).toBe(401);
    });

    test('Add a post to toEat list with invalid postId returns 400', async () => {
      const res = await supertest(server)
        .post('/api/v0/toEat/post')
        .set('Authorization', `Bearer ${lucaToken}`)
        .query({ postId: invalidPostID });

      expect(res.status).toBe(400);
    });

    test('Add a post to toEat list when service returns undefined returns 400', async () => {
      jest.spyOn(toEatService.prototype, 'postToEatList').mockResolvedValue(undefined);

      const res = await supertest(server)
        .post('/api/v0/toEat/post')
        .set('Authorization', `Bearer ${lucaToken}`)
        .query({ postId: keatonPostID });

      expect(res.status).toBe(400);
    });

    test('Add a post to toEat list when an exception is thrown returns 500', async () => {
      jest.spyOn(toEatService.prototype, 'postToEatList').mockImplementation(() => {
        throw new Error('Database error');
      });

      const res = await supertest(server)
        .post('/api/v0/toEat/post')
        .set('Authorization', `Bearer ${lucaToken}`)
        .query({ postId: keatonPostID });

      expect(res.status).toBe(500);
    });

    test('Add a post to toEat list that already exists returns 400', async () => {
      // First, add the post
      await supertest(server)
        .post('/api/v0/toEat/post')
        .set('Authorization', `Bearer ${lucaToken}`)
        .query({ postId: keatonPostID });

      // Try adding it again
      const res = await supertest(server)
        .post('/api/v0/toEat/post')
        .set('Authorization', `Bearer ${lucaToken}`)
        .query({ postId: keatonPostID });

      expect(res.status).toBe(400);
    });
  });

  /**
   * Tests for /toEat/delete endpoint
   */
  describe('/toEat/delete Endpoint', () => {
    test('Delete a post from toEat list successfully', async () => {
      // First, Luca adds a post to his toEat list
      await supertest(server)
        .post('/api/v0/toEat/post')
        .set('Authorization', `Bearer ${lucaToken}`)
        .query({ postId: keatonPostID });

      // Then, he deletes it
      const res = await supertest(server)
        .delete('/api/v0/toEat/delete')
        .set('Authorization', `Bearer ${lucaToken}`)
        .query({ postId: keatonPostID });

      expect(res.status).toBe(204);
    });

    test('Delete a post from toEat list without authorization token returns 401', async () => {
      const res = await supertest(server)
        .delete('/api/v0/toEat/delete')
        .query({ postId: keatonPostID });

      expect(res.status).toBe(401);
    });

    test('Delete a post from toEat list with invalid token returns 401', async () => {
      const res = await supertest(server)
        .delete('/api/v0/toEat/delete')
        .set('Authorization', `Bearer invalidtoken`)
        .query({ postId: keatonPostID });

      expect(res.status).toBe(401);
    });

    test('Delete a post from toEat list with invalid postId returns 500', async () => {
      const res = await supertest(server)
        .delete('/api/v0/toEat/delete')
        .set('Authorization', `Bearer ${lucaToken}`)
        .query({ postId: invalidPostID });

      expect(res.status).toBe(500);
    });

    test('Delete a post not in toEat list returns 400', async () => {
      // Attempt to delete a post that hasn't been added
      const res = await supertest(server)
        .delete('/api/v0/toEat/delete')
        .set('Authorization', `Bearer ${keatonToken}`)
        .query({ postId: lucaPostID });

      expect(res.status).toBe(400);
    });

    test('Delete a post from toEat list when service returns undefined returns 400', async () => {
      jest.spyOn(toEatService.prototype, 'deleteFromToEat').mockResolvedValue(undefined);

      const res = await supertest(server)
        .delete('/api/v0/toEat/delete')
        .set('Authorization', `Bearer ${lucaToken}`)
        .query({ postId: keatonPostID });

      expect(res.status).toBe(400);
    });

    test('Delete a post from toEat list when an exception is thrown returns 500', async () => {
      jest.spyOn(toEatService.prototype, 'deleteFromToEat').mockImplementation(() => {
        throw new Error('Database error');
      });

      const res = await supertest(server)
        .delete('/api/v0/toEat/delete')
        .set('Authorization', `Bearer ${lucaToken}`)
        .query({ postId: keatonPostID });

      expect(res.status).toBe(500);
    });
  });

  /**
   * Tests for /toEat/isInToEat endpoint
   */
  describe('/toEat/isInToEat Endpoint', () => {
    test('Check if a post is in toEat list successfully', async () => {
      // First, Luca adds a post to his toEat list
      await supertest(server)
        .post('/api/v0/toEat/post')
        .set('Authorization', `Bearer ${lucaToken}`)
        .query({ postId: keatonPostID });

      const res = await supertest(server)
        .get('/api/v0/toEat/isInToEat')
        .set('Authorization', `Bearer ${lucaToken}`)
        .query({ postId: keatonPostID });

      expect(res.status).toBe(200);
    });

    test('Check if a post is in toEat list without authorization token returns 401', async () => {
      const res = await supertest(server)
        .get('/api/v0/toEat/isInToEat')
        .query({ postId: keatonPostID });

      expect(res.status).toBe(401);
    });

    test('Check if a post is in toEat list with invalid token returns 401', async () => {
      const res = await supertest(server)
        .get('/api/v0/toEat/isInToEat')
        .set('Authorization', `Bearer invalidtoken`)
        .query({ postId: keatonPostID });

      expect(res.status).toBe(401);
    });

    test('Check if a post is in toEat list with invalid postId returns 400', async () => {
      const res = await supertest(server)
        .get('/api/v0/toEat/isInToEat')
        .set('Authorization', `Bearer ${lucaToken}`)
        .query({ postId: invalidPostID });

      expect(res.status).toBe(400);
    });

    test('Check if a post is in toEat list when service returns undefined returns 400', async () => {
      jest.spyOn(toEatService.prototype, 'isInToEat').mockResolvedValue(undefined);

      const res = await supertest(server)
        .get('/api/v0/toEat/isInToEat')
        .set('Authorization', `Bearer ${lucaToken}`)
        .query({ postId: keatonPostID });

      expect(res.status).toBe(400);
    });

    test('Check if a post is in toEat list when an exception is thrown returns 500', async () => {
      jest.spyOn(toEatService.prototype, 'isInToEat').mockImplementation(() => {
        throw new Error('Database error');
      });

      const res = await supertest(server)
        .get('/api/v0/toEat/isInToEat')
        .set('Authorization', `Bearer ${lucaToken}`)
        .query({ postId: keatonPostID });

      expect(res.status).toBe(500);
    });
  });
});
