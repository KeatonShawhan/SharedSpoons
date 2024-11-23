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

describe('Basic Test Suite: Verify basic functionality of /welcome/uploadData endpoint', () => {
  test('Upload welcome data with valid input', async () => {
    const foodsPreferred = ['Pizza', 'Sushi', 'Burger'];

    const res = await supertest(server)
      .post('/api/v0/welcome/uploadData')
      .set('Authorization', `Bearer ${testUserToken}`)
      .send( foodsPreferred );

    expect(res.status).toBe(200);
    expect(res.body).toBe(true);
  });
});

describe('Error Test Suite: Verify error handling of /welcome/uploadData endpoint', () => {
  test('Upload data without authorization token', async () => {
    const foodsPreferred = ['Pizza', 'Sushi', 'Burger'];

    const res = await supertest(server)
      .post('/api/v0/welcome/uploadData')
      .send( foodsPreferred );

    expect(res.status).toBe(401);
  });

  test('Upload data with invalid token', async () => {
    const foodsPreferred = ['Pizza', 'Sushi', 'Burger'];

    const res = await supertest(server)
      .post('/api/v0/welcome/uploadData')
      .set('Authorization', `Bearer invalidtoken`)
      .send( foodsPreferred );

    expect(res.status).toBe(401);
  });

  test('Upload data with empty foodsPreferred array', async () => {
    const foodsPreferred: string[] = [];

    const res = await supertest(server)
      .post('/api/v0/welcome/uploadData')
      .set('Authorization', `Bearer ${testUserToken}`)
      .send( foodsPreferred );

    expect(res.status).toBe(400);
  });

  test('Upload data with invalid foodsPreferred (not an array)', async () => {
    const foodsPreferred = 'Not an array';

    const res = await supertest(server)
      .post('/api/v0/welcome/uploadData')
      .set('Authorization', `Bearer ${testUserToken}`)
      .send( foodsPreferred );

    expect(res.status).toBe(400);
  });

  test('Upload data with invalid elements in foodsPreferred', async () => {
    const foodsPreferred = ['Pizza', 123, null];

    const res = await supertest(server)
      .post('/api/v0/welcome/uploadData')
      .set('Authorization', `Bearer ${testUserToken}`)
      .send( foodsPreferred );

    expect(res.status).toBe(400);
  });

});
