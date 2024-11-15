import supertest from 'supertest';
import * as http from 'http';
import app from '../../src/app'; // Adjust path as needed to your Express app
import * as db from '../db';
import jwt from 'jsonwebtoken';
import { UUID } from '../../src/types/index';
import { S3Service } from '../../src/s3/service';
import path from 'path';

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
const invalidUserID = 'bbbbbbbb-971b-4e60-a692-a3af3365ba85';

const lucaToken = generateTestToken(lucaID, 'lucaschram', 'Luca', 'Schram');
const invalidToken = generateTestToken(invalidUserID, 'invalid', 'Invalid', 'User');

describe('Basic Test Suite: Verify basic functionality of /account/update endpoint', () => {
  test('Update account with valid data and testcat picture', async () => {
    const updateRequest = {
      username: 'newusername',
      bio: 'Updated bio',
      location: 'New Location',
    };

    const res = await supertest(server)
      .put('/api/v0/account/update')
      .set('Authorization', `Bearer ${lucaToken}`)
      .field('updateRequest', JSON.stringify(updateRequest))
      .attach('file', path.resolve(__dirname, '../testcat.jpg')); // Assuming you have a fixtures directory with testcat.jpg

    expect(res.status).toBe(200);
  });

  test('Update account with valid data without testcat picture', async () => {
    const updateRequest = {
      bio: 'Updated bio only',
    };

    const res = await supertest(server)
      .put('/api/v0/account/update')
      .set('Authorization', `Bearer ${lucaToken}`)
      .field('updateRequest', JSON.stringify(updateRequest));

    expect(res.status).toBe(200);
  });
});

describe('Error Test Suite: Verify error handling of /account/update endpoint', () => {
  test('Update account without authorization token', async () => {
    const updateRequest = {
      username: 'newusername',
    };

    const res = await supertest(server)
      .put('/api/v0/account/update')
      .field('updateRequest', JSON.stringify(updateRequest));

    expect(res.status).toBe(401);
  });

  test('Update account with invalid token', async () => {
    const updateRequest = {
      username: 'newusername',
    };

    const res = await supertest(server)
      .put('/api/v0/account/update')
      .set('Authorization', `Bearer invalidtoken`)
      .field('updateRequest', JSON.stringify(updateRequest));

    expect(res.status).toBe(401);
  });

  test('Update account with username already in use', async () => {
    const updateRequest = {
      username: 'keatonshawhan', // Assuming this username is already taken by Keaton
    };

    const res = await supertest(server)
      .put('/api/v0/account/update')
      .set('Authorization', `Bearer ${lucaToken}`)
      .field('updateRequest', JSON.stringify(updateRequest));

    expect(res.status).toBe(400);
  });

  test('Update account with invalid file type', async () => {
    const updateRequest = {
      bio: 'Attempt to upload invalid file type',
    };

    const res = await supertest(server)
      .put('/api/v0/account/update')
      .set('Authorization', `Bearer ${lucaToken}`)
      .field('updateRequest', JSON.stringify(updateRequest))
      .attach('file', path.resolve(__dirname, '../testcat.txt')); // Invalid file type

    expect(res.status).toBe(400);
  });

  test('Update account with failure to upload file', async () => {
    // Mock S3Service to simulate failure
    jest.spyOn(S3Service.prototype, 'uploadFile').mockImplementation(() => {
      return Promise.resolve(undefined);
    });

    const updateRequest = {
      bio: 'Attempt to upload file but fail',
    };

    const res = await supertest(server)
      .put('/api/v0/account/update')
      .set('Authorization', `Bearer ${lucaToken}`)
      .field('updateRequest', JSON.stringify(updateRequest))
      .attach('file', path.resolve(__dirname, '../testcat.jpg'));

    expect(res.status).toBe(400);

    // Restore the original implementation
    jest.restoreAllMocks();
  });

  test('Update account when user not found', async () => {
    const updateRequest = {
      bio: 'Bio update for non-existent user',
    };

    const res = await supertest(server)
      .put('/api/v0/account/update')
      .set('Authorization', `Bearer ${invalidToken}`) // Token for non-existent user
      .field('updateRequest', JSON.stringify(updateRequest));

    expect(res.status).toBe(400);
  });

  test('Update account with invalid updateRequest format', async () => {
    const updateRequest = 'Invalid JSON String';

    const res = await supertest(server)
      .put('/api/v0/account/update')
      .set('Authorization', `Bearer ${lucaToken}`)
      .field('updateRequest', updateRequest); // Invalid JSON

    expect(res.status).toBe(500); // Assuming invalid JSON results in 500 Bad Request
  });
});
