import supertest from 'supertest';
import * as http from 'http';
import app from '../../src/app'; // Adjust path as needed to your Express app
import * as db from '../db';
import jwt from 'jsonwebtoken';
import {UUID} from '../../src/types/index';
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

const generateTestToken = ( id:UUID, username:string, firstname:string, lastname:string ) => {
  const payload = { id:id, isername:username, firstname:firstname, lastname:lastname };
  return jwt.sign(payload, `${process.env.HASH_MASTER_SECRET}`, { expiresIn: '1h', algorithm: 'HS256' });
};

const lucaID = 'a3059ef4-971b-4e60-a692-a3af3365ba85';
const keatonID = '3b9a58b2-2a07-45d6-85c9-f138d63cb466';
const invalidUserID = 'bbbbbbbb-971b-4e60-a692-a3af3365ba85';

const lucaToken = generateTestToken('a3059ef4-971b-4e60-a692-a3af3365ba85', 'lucaschram', 'Luca', 'Schram');
const testUserToken = generateTestToken('38ababab-2a07-45d6-85c9-f138d63cb466', 'testuser', 'Test', 'User');

describe('Basic Test Suite: Verify Basic functionality of all endpoints', () => {
  test('Get followers for valid user', async () => {
    const res = await supertest(server)
      .get('/api/v0/follow/getFollowers')
      .set('Authorization', `Bearer ${lucaToken}`)
      .query({ user: lucaID });
  
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
    expect(res.body[0]).toHaveProperty('id', keatonID);
    expect(res.body[0]).toHaveProperty('firstname', 'Keaton');
    expect(res.body[0]).toHaveProperty('lastname', 'Shawhan');
    expect(res.body[0]).toHaveProperty('username', 'keatonshawhan');
  });
  
  test('Get followers count for valid user', async () => {
    const res = await supertest(server)
      .get('/api/v0/follow/getFollowersCount')
      .set('Authorization', `Bearer ${lucaToken}`)
      .query({ user: lucaID });
  
    expect(res.status).toBe(200);
    expect(typeof res.body).toBe('number');
    expect(res.body).toBeGreaterThan(0);
  });
  
  test('Get following for valid user', async () => {
    const res = await supertest(server)
      .get('/api/v0/follow/getFollowing')
      .set('Authorization', `Bearer ${lucaToken}`)
      .query({ user: lucaID });
  
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
    expect(res.body[0]).toHaveProperty('id', keatonID);
    expect(res.body[0]).toHaveProperty('firstname', 'Keaton');
    expect(res.body[0]).toHaveProperty('lastname', 'Shawhan');
    expect(res.body[0]).toHaveProperty('username', 'keatonshawhan');
  });
  
  test('Get following count for valid user', async () => {
    const res = await supertest(server)
      .get('/api/v0/follow/getFollowingCount')
      .set('Authorization', `Bearer ${lucaToken}`)
      .query({ user: lucaID });
  
    expect(res.status).toBe(200);
    expect(typeof res.body).toBe('number');
    expect(res.body).toBeGreaterThan(0);
  });
  
  test('Send follow request', async () => {
    const res = await supertest(server)
      .post('/api/v0/follow/send')
      .set('Authorization', `Bearer ${testUserToken}`)
      .query({ receiver: lucaID });
  
    expect(res.status).toBe(200);
    expect(res.body).toBe(true);
  });
  
  test('Remove follow relationship', async () => {
    // First, test user follows Luca
    await supertest(server)
      .post('/api/v0/follow/send')
      .set('Authorization', `Bearer ${testUserToken}`)
      .query({ receiver: lucaID });
  
    // Then, test user unfollows Luca
    const res = await supertest(server)
      .delete('/api/v0/follow/remove')
      .set('Authorization', `Bearer ${testUserToken}`)
      .query({ receiver: lucaID });
  
    expect(res.status).toBe(200);
    expect(res.body).toBe(true);
  });
});
  
describe('Error Test Suite: Verify error handling of /follow/getFollowers endpoint', () => {
  test('Get followers without authorization token', async () => {
    const res = await supertest(server)
      .get('/api/v0/follow/getFollowers')
      .query({ user: lucaID });
  
    expect(res.status).toBe(401);
  });
  
  test('Get followers with invalid user ID format', async () => {
    const res = await supertest(server)
      .get('/api/v0/follow/getFollowers')
      .set('Authorization', `Bearer ${lucaToken}`)
      .query({ user: 'invalid-uuid' });
  
    expect(res.status).toBe(400);
  });
  
  test('Get followers for non-existent user', async () => {
    const res = await supertest(server)
      .get('/api/v0/follow/getFollowers')
      .set('Authorization', `Bearer ${lucaToken}`)
      .query({ user: invalidUserID });
  
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(0);
  });
});
  
describe('Error Test Suite: Verify error handling of /follow/getFollowersCount endpoint', () => {
  test('Get followers count without authorization token', async () => {
    const res = await supertest(server)
      .get('/api/v0/follow/getFollowersCount')
      .query({ user: lucaID });
  
    expect(res.status).toBe(401);
  });
  
  test('Get followers count with invalid user ID format', async () => {
    const res = await supertest(server)
      .get('/api/v0/follow/getFollowersCount')
      .set('Authorization', `Bearer ${lucaToken}`)
      .query({ user: 'invalid-uuid' });
  
    expect(res.status).toBe(400);
  });
  
  test('Get followers count for non-existent user', async () => {
    const res = await supertest(server)
      .get('/api/v0/follow/getFollowersCount')
      .set('Authorization', `Bearer ${lucaToken}`)
      .query({ user: invalidUserID });
  
    expect(res.status).toBe(200);
    expect(res.body).toBe(0);
  });
});
  
describe('Error Test Suite: Verify error handling of /follow/getFollowing endpoint', () => {
  test('Get following without authorization token', async () => {
    const res = await supertest(server)
      .get('/api/v0/follow/getFollowing')
      .query({ user: lucaID });
  
    expect(res.status).toBe(401);
  });
  
  test('Get following with invalid user ID format', async () => {
    const res = await supertest(server)
      .get('/api/v0/follow/getFollowing')
      .set('Authorization', `Bearer ${lucaToken}`)
      .query({ user: 'invalid-uuid' });
  
    expect(res.status).toBe(400);
  });
  
  test('Get following for non-existent user', async () => {
    const res = await supertest(server)
      .get('/api/v0/follow/getFollowing')
      .set('Authorization', `Bearer ${lucaToken}`)
      .query({ user: invalidUserID });
  
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(0);
  });
});
  
describe('Error Test Suite: Verify error handling of /follow/getFollowingCount endpoint', () => {
  test('Get following count without authorization token', async () => {
    const res = await supertest(server)
      .get('/api/v0/follow/getFollowingCount')
      .query({ user: lucaID });
  
    expect(res.status).toBe(401);
  });
  
  test('Get following count with invalid user ID format', async () => {
    const res = await supertest(server)
      .get('/api/v0/follow/getFollowingCount')
      .set('Authorization', `Bearer ${lucaToken}`)
      .query({ user: 'invalid-uuid' });
  
    expect(res.status).toBe(400);
  });
  
  test('Get following count for non-existent user', async () => {
    const res = await supertest(server)
      .get('/api/v0/follow/getFollowingCount')
      .set('Authorization', `Bearer ${lucaToken}`)
      .query({ user: invalidUserID });
  
    expect(res.status).toBe(200);
    expect(res.body).toBe(0);
  });
});
  
describe('Error Test Suite: Verify error handling of /follow/send endpoint', () => {
  test('Send follow request without authorization token', async () => {
    const res = await supertest(server)
      .post('/api/v0/follow/send')
      .query({ receiver: lucaID });
  
    expect(res.status).toBe(401);
  });
  
  test('Send follow request with invalid receiver ID format', async () => {
    const res = await supertest(server)
      .post('/api/v0/follow/send')
      .set('Authorization', `Bearer ${testUserToken}`)
      .query({ receiver: 'invalid-uuid' });
  
    expect(res.status).toBe(400);
  });
  
  test('Send follow request to non-existent user', async () => {
    const res = await supertest(server)
      .post('/api/v0/follow/send')
      .set('Authorization', `Bearer ${testUserToken}`)
      .query({ receiver: invalidUserID });
  
    expect(res.status).toBe(404);
    expect(res.body).toBe(false);
  });
  
  test('Send follow request when already following', async () => {
    // First, test user follows Luca
    await supertest(server)
      .post('/api/v0/follow/send')
      .set('Authorization', `Bearer ${testUserToken}`)
      .query({ receiver: lucaID });
  
    // Then, try to follow again
    const res = await supertest(server)
      .post('/api/v0/follow/send')
      .set('Authorization', `Bearer ${testUserToken}`)
      .query({ receiver: lucaID });
  
    expect(res.status).toBe(404);
    expect(res.body).toBe(false);
  });
  
  test('Send follow request to self', async () => {
    const res = await supertest(server)
      .post('/api/v0/follow/send')
      .set('Authorization', `Bearer ${lucaToken}`)
      .query({ receiver: lucaID });
  
    expect(res.status).toBe(404);
    expect(res.body).toBe(false);
  });
});
  
describe('Error Test Suite: Verify error handling of /follow/remove endpoint', () => {
  test('Remove follow relationship without authorization token', async () => {
    const res = await supertest(server)
      .delete('/api/v0/follow/remove')
      .query({ receiver: lucaID });
  
    expect(res.status).toBe(401);
  });
  
  test('Remove follow relationship with invalid receiver ID format', async () => {
    const res = await supertest(server)
      .delete('/api/v0/follow/remove')
      .set('Authorization', `Bearer ${testUserToken}`)
      .query({ receiver: 'invalid-uuid' });
  
    expect(res.status).toBe(400);
  });
  
  test('Remove follow relationship with non-existent user', async () => {
    const res = await supertest(server)
      .delete('/api/v0/follow/remove')
      .set('Authorization', `Bearer ${testUserToken}`)
      .query({ receiver: invalidUserID });
  
    expect(res.status).toBe(404);
    expect(res.body).toBe(false);
  });
  
  test('Remove follow relationship when not following', async () => {
    // Ensure the test user is not following Luca
    const res = await supertest(server)
      .delete('/api/v0/follow/remove')
      .set('Authorization', `Bearer ${testUserToken}`)
      .query({ receiver: lucaID });
  
    expect(res.status).toBe(404);
    expect(res.body).toBe(false);
  });
});
  



