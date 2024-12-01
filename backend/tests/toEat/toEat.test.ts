import supertest from 'supertest';
import * as http from 'http';
import app from '../../src/app';
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

const lucaID = 'a3059ef4-971b-4e60-a692-a3af3365ba85';
const keatonID = '3b9a58b2-2a07-45d6-85c9-f138d63cb466';
const invalidUserID = 'bbbbbbbb-971b-4e60-a692-a3af3365ba85';

const lucaToken = generateTestToken(lucaID, 'lucaschram', 'Luca', 'Schram');
const keatonToken = generateTestToken(keatonID, 'keatonshawhan', 'Keaton', 'Shawhan');
const invalidToken = generateTestToken(invalidUserID, 'invalid', 'Invalid', 'User');

const lucaPostID = 'a5059ef4-971b-4e60-a692-a3af3365ba85'; // Post by Luca
const keatonPostID = 'a9359ef4-971b-4e60-a692-a3af3365ba85'; // Post by Keaton
const invalidPostID = 'invalid-post-id';

describe('Basic Test Suite: Verify basic functionality of all endpoints', () => {

  test('Add a post to toEat list', async () => {
      const res = await supertest(server)
        .post('/api/v0/toEat/post')
        .set('Authorization', `Bearer ${keatonToken}`)
        .query({ postId: lucaPostID });
  
      expect(res.status).toBe(200);
    });

  test('Get toEat list', async () => {
    // First, Luca adds a post to his toEat list
    await supertest(server)
      .post('/api/v0/toEat/post')
      .set('Authorization', `Bearer ${lucaToken}`)
      .query({ postId: keatonPostID });

    const res = await supertest(server)
      .get('/api/v0/toEat/getList')
      .set('Authorization', `Bearer ${lucaToken}`);

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(1);
  });

  test('Delete a post from toEat list', async () => {
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
});


describe('Error Test Suite: Verify error handling of /toEat/getList endpoint', () => {
  test('Get toEat list without authorization token', async () => {
    const res = await supertest(server)
      .get('/api/v0/toEat/getList');

    expect(res.status).toBe(401);
  });

  test('Get toEat list with invalid token', async () => {
    const res = await supertest(server)
      .get('/api/v0/toEat/getList')
      .set('Authorization', `Bearer ${invalidToken}`);

    expect(res.status).toBe(400);
  });
});

describe('Error Test Suite: Verify error handling of /toEat/post endpoint', () => {
  test('Add a post to toEat list without authorization token', async () => {
    const res = await supertest(server)
      .post('/api/v0/toEat/post')
      .query({ postId: keatonPostID });

    expect(res.status).toBe(401);
  });

  test('Add a post to toEat list with invalid postId', async () => {
    const res = await supertest(server)
      .post('/api/v0/toEat/post')
      .set('Authorization', `Bearer ${lucaToken}`)
      .query({ postId: invalidPostID });

    expect(res.status).toBe(400);
  });

  test('Add a post to toEat list that already exists', async () => {
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

describe('Error Test Suite: Verify error handling of /toEat/delete endpoint', () => {
  test('Delete a post from toEat list without authorization token', async () => {
    const res = await supertest(server)
      .delete('/api/v0/toEat/delete')
      .query({ postId: keatonPostID });

    expect(res.status).toBe(401);
  });

  test('Delete a post from toEat list with invalid postId', async () => {
    const res = await supertest(server)
      .delete('/api/v0/toEat/delete')
      .set('Authorization', `Bearer ${lucaToken}`)
      .query({ postId: invalidPostID });

    expect(res.status).toBe(500);
  });

  test('Delete a post not in toEat list', async () => {
    // Attempt to delete a post that hasn't been added
    const res = await supertest(server)
      .delete('/api/v0/toEat/delete')
      .set('Authorization', `Bearer ${keatonToken}`)
      .query({ postId: lucaPostID });

    expect(res.status).toBe(400);
  });
});
