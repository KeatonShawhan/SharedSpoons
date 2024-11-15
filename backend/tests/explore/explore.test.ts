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

describe('Basic Test Suite: Verify basic functionality of all endpoints', () => {
    test('Search suggestion returns correct users', async () => {
    const input = 'luc';
    const currentUsername = 'testuser';

    const res = await supertest(server)
    .get('/api/v0/explore/search/suggestion')
    .set('Authorization', `Bearer ${testUserToken}`)
    .query({ input, currentUsername });

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);

    // Assuming the test data includes a user with username 'lucaschram'
    const usernames = [...res.body].map((user) => user.username);
    expect(usernames).toContain('lucaschram');
    });

    test('Search suggestion does not include current user', async () => {
    const input = 'test';
    const currentUsername = 'testuser';

    const res = await supertest(server)
    .get('/api/v0/explore/search/suggestion')
    .set('Authorization', `Bearer ${testUserToken}`)
    .query({ input, currentUsername });

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);

    // Should not include 'testuser' in the results
    const usernames = [...res.body].map((user) => user.username);
    expect(usernames).not.toContain('testuser');
    });

    test('Search suggestion with input length >=1', async () => {
    const input = 'a'; // Single character input
    const currentUsername = 'testuser';

    const res = await supertest(server)
    .get('/api/v0/explore/search/suggestion')
    .set('Authorization', `Bearer ${testUserToken}`)
    .query({ input, currentUsername });

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    });
});

describe('Error Test Suite: Verify error handling of /explore/search/suggestion endpoint', () => {
    test('Search suggestion with empty input', async () => {
    const input = '';
    const currentUsername = 'testuser';

    const res = await supertest(server)
    .get('/api/v0/explore/search/suggestion')
    .set('Authorization', `Bearer ${testUserToken}`)
    .query({ input, currentUsername });

    expect(res.status).toBe(400);
    expect(res.body).toEqual([]);
    });

    test('Search suggestion without authorization token', async () => {
    const input = 'luc';
    const currentUsername = 'testuser';

    const res = await supertest(server)
    .get('/api/v0/explore/search/suggestion')
    .query({ input, currentUsername });

    expect(res.status).toBe(401);
    });

    test('Search suggestion with invalid token', async () => {
    const input = 'luc';
    const currentUsername = 'testuser';

    const res = await supertest(server)
    .get('/api/v0/explore/search/suggestion')
    .set('Authorization', `Bearer invalidtoken`)
    .query({ input, currentUsername });

    expect(res.status).toBe(401);
    });

    test('Search suggestion with missing currentUsername', async () => {
    const input = 'luc';

    const res = await supertest(server)
    .get('/api/v0/explore/search/suggestion')
    .set('Authorization', `Bearer ${testUserToken}`)
    .query({ input });

    expect(res.status).toBe(400); // Assuming missing required parameter results in 400
    });

    test('Search suggestion with input causing no results', async () => {
    const input = 'nonexistentuser';
    const currentUsername = 'testuser';

    const res = await supertest(server)
    .get('/api/v0/explore/search/suggestion')
    .set('Authorization', `Bearer ${testUserToken}`)
    .query({ input, currentUsername });

    expect(res.status).toBe(200);
    expect(res.body).toEqual([]);
    });
});
