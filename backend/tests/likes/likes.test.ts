import supertest from 'supertest';
import * as http from 'http';
import app from '../../src/app'; // Adjust path as needed to your Express app
import * as db from '../db';
import jwt from 'jsonwebtoken';
import { UUID } from '../../src/types/index';

let server: http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>;

beforeAll(async () => {
  server = http.createServer(app);
  server.listen();
  await db.reset();
});

afterEach(async () => {
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

const testUserID = '38ababab-2a07-45d6-85c9-f138d63cb466';

const testUserToken = generateTestToken(testUserID, 'testuser', 'Test', 'User');

const lucaPostID = 'a5059ef4-971b-4e60-a692-a3af3365ba85'; // Post by Luca
const keatonPostID = 'a9359ef4-971b-4e60-a692-a3af3365ba85'; // Post by Keaton
const invalidPostID = 'invalid-post-id';

describe('Basic Test Suite: Verify basic functionality of all endpoints', () => {
  test('Add a like to a post', async () => {
    const res = await supertest(server)
      .post('/api/v0/likes/add')
      .set('Authorization', `Bearer ${testUserToken}`)
      .query({ post: lucaPostID });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('user_id', testUserID);
    expect(res.body).toHaveProperty('post_id', lucaPostID);
  });

  test('Remove a like from a post', async () => {
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

  test('Get like count for a post', async () => {
    // Add likes from different users
    const res = await supertest(server)
      .get('/api/v0/likes/getLikeCount')
      .set('Authorization', `Bearer ${testUserToken}`)
      .query({ post: keatonPostID });

    expect(res.status).toBe(200);
    expect(res.body).toBe(1);
  });
});

describe('Error Test Suite: Verify error handling of /likes/add endpoint', () => {
  test('Add like without authorization token', async () => {
    const res = await supertest(server)
      .post('/api/v0/likes/add')
      .query({ post: lucaPostID });

    expect(res.status).toBe(401);
  });

  test('Add like with invalid token', async () => {
    const res = await supertest(server)
      .post('/api/v0/likes/add')
      .set('Authorization', `Bearer invalidtoken`)
      .query({ post: lucaPostID });

    expect(res.status).toBe(401);
  });

  test('Add like to invalid post ID', async () => {
    const res = await supertest(server)
      .post('/api/v0/likes/add')
      .set('Authorization', `Bearer ${testUserToken}`)
      .query({ post: invalidPostID });

    expect(res.status).toBe(400);
  });

  test('Add like that already exists', async () => {
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
});

describe('Error Test Suite: Verify error handling of /likes/remove endpoint', () => {
  test('Remove like without authorization token', async () => {
    const res = await supertest(server)
      .delete('/api/v0/likes/remove')
      .query({ post: lucaPostID });

    expect(res.status).toBe(401);
  });

  test('Remove like with invalid token', async () => {
    const res = await supertest(server)
      .delete('/api/v0/likes/remove')
      .set('Authorization', `Bearer invalidtoken`)
      .query({ post: lucaPostID });

    expect(res.status).toBe(401);
  });

  test('Remove like from invalid post ID', async () => {
    const res = await supertest(server)
      .delete('/api/v0/likes/remove')
      .set('Authorization', `Bearer ${testUserToken}`)
      .query({ post: invalidPostID });

    expect(res.status).toBe(400);
  });

  test('Remove like that does not exist', async () => {
    // Attempt to remove a like that hasn't been added
    const res = await supertest(server)
      .delete('/api/v0/likes/remove')
      .set('Authorization', `Bearer ${testUserToken}`)
      .query({ post: lucaPostID });

    expect(res.status).toBe(400);
  });
});

describe('Error Test Suite: Verify error handling of /likes/getLikeCount endpoint', () => {
  test('Get like count for invalid post ID', async () => {
    const res = await supertest(server)
      .get('/api/v0/likes/getLikeCount')
      .set('Authorization', `Bearer ${testUserToken}`)
      .query({ post: invalidPostID });

    expect(res.status).toBe(400);
  });
});
