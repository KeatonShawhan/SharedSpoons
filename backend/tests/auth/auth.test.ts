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
const invalidUserID = 'bbbbbbbb-971b-4e60-a692-a3af3365ba85';

const lucaToken = generateTestToken('a3059ef4-971b-4e60-a692-a3af3365ba85', 'lucaschram', 'Luca', 'Schram');

describe('Basic Test Suite: Verify basic functionality of all endpoints', () => {
    test('Login with valid credentials', async () => {
      const credentials = { username: 'lucaschram', password: 'lucasucks123' };
      const res = await supertest(server)
        .post('/api/v0/auth/login')
        .send(credentials);
  
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('id', lucaID);
      expect(res.body).toHaveProperty('firstname', 'Luca');
      expect(res.body).toHaveProperty('lastname', 'Schram');
      expect(res.body).toHaveProperty('accessToken');
    });
  
    test('Signup with valid information', async () => {
      const signupInfo = {
        firstname: 'New',
        lastname: 'User',
        email: 'newuser@example.com',
        username: 'newuser',
        location: 'Santa Cruz, CA',
        password: 'newpassword123',
        phoneNumber: '(111) 111-1111'
      };
      const res = await supertest(server)
        .post('/api/v0/auth/signup')
        .send(signupInfo);
  
      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty('id');
      expect(res.body).toHaveProperty('firstname', 'New');
      expect(res.body).toHaveProperty('lastname', 'User');
      expect(res.body).toHaveProperty('accessToken');
    });
  
    test('Check access token', async () => {
      const res = await supertest(server)
        .get('/api/v0/auth')
        .set('Authorization', `Bearer ${lucaToken}`)
        .query({ accessToken: lucaToken });
  
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('id', lucaID);
    });
  
    test('Get user info', async () => {
      const res = await supertest(server)
        .get('/api/v0/auth/userInfo')
        .set('Authorization', `Bearer ${lucaToken}`)
        .query({ id: lucaID });
  
      expect(res.status).toBe(200);
      const resJSON = JSON.parse(res.text);
        expect(resJSON).toHaveProperty('id', lucaID);
        expect(resJSON).toHaveProperty('firstname', 'Luca');
        expect(resJSON).toHaveProperty('lastname', 'Schram');
    });
  });
  
  describe('Error Test Suite: Verify error handling of /auth/login endpoint', () => {
    test('Login with invalid credentials', async () => {
      const credentials = { username: 'lucaschram', password: 'wrongpassword' };
      const res = await supertest(server)
        .post('/api/v0/auth/login')
        .send(credentials);
  
      expect(res.status).toBe(401);
    });
  
    test('Login with non-existent user', async () => {
      const credentials = { username: 'nonexistentuser', password: 'password' };
      const res = await supertest(server)
        .post('/api/v0/auth/login')
        .send(credentials);
  
      expect(res.status).toBe(401);
    });
  
    test('Login with missing credentials', async () => {
      const res = await supertest(server)
        .post('/api/v0/auth/login')
        .send({});
  
      expect(res.status).toBe(400); // Assuming the endpoint returns 400 Bad Request for missing fields
    });
  });
  
  describe('Error Test Suite: Verify error handling of /auth/signup endpoint', () => {
    test('Signup with existing email', async () => {
      const signupInfo = {
        firstname: 'Duplicate',
        lastname: 'User',
        email: 'lschram@ucsc.edu', // Existing email
        username: 'duplicateuser',
        password: 'password123',
        location: 'Los Lobos, CA',
        phoneNumber: '(222) 222-2222'
      };
      const res = await supertest(server)
        .post('/api/v0/auth/signup')
        .send(signupInfo);
  
      expect(res.status).toBe(409); // Conflict
    });
  
    test('Signup with existing username', async () => {
      const signupInfo = {
        firstname: 'Duplicate',
        lastname: 'User',
        email: 'uniqueemail@example.com',
        username: 'lucaschram', // Existing username
        password: 'password123',
        location: 'San Jose, CA',
        phoneNumber: '(222) 222-2222'
      };
      const res = await supertest(server)
        .post('/api/v0/auth/signup')
        .send(signupInfo);
  
      expect(res.status).toBe(409); // Conflict
    });
  
    test('Signup with existing phone number', async () => {
      const signupInfo = {
        firstname: 'Duplicate',
        lastname: 'User',
        email: 'uniqueemail@example.com',
        username: 'uniqueusername',
        password: 'password123',
        location: 'San Jose, CA',
        phoneNumber: '(123) 123-1232' // Existing phone number
      };
      const res = await supertest(server)
        .post('/api/v0/auth/signup')
        .send(signupInfo);
  
      expect(res.status).toBe(409); // Conflict
    });
  
    test('Signup with missing fields', async () => {
      const signupInfo = {
        firstname: 'Incomplete',
        password: 'password123',
      };
      const res = await supertest(server)
        .post('/api/v0/auth/signup')
        .send(signupInfo);
  
      expect(res.status).toBe(400); // Bad Request
    });
  });
  
  describe('Error Test Suite: Verify error handling of /auth endpoint', () => {
    test('Check with invalid access token', async () => {
      const res = await supertest(server)
        .get('/api/v0/auth')
        .set('Authorization', `Bearer invalidtoken`)
        .query({ accessToken: 'invalidtoken' });
  
      expect(res.status).toBe(401);
    });
  
    test('Check without access token', async () => {
      const res = await supertest(server)
        .get('/api/v0/auth');
  
      expect(res.status).toBe(401);
    });
  });
  
  describe('Error Test Suite: Verify error handling of /auth/userInfo endpoint', () => {
    test('Get user info without authorization token', async () => {
      const res = await supertest(server)
        .get('/api/v0/auth/userInfo')
        .query({ id: lucaID });
  
      expect(res.status).toBe(401);
    });
  
    test('Get user info with invalid user ID', async () => {
      const res = await supertest(server)
        .get('/api/v0/auth/userInfo')
        .set('Authorization', `Bearer ${lucaToken}`)
        .query({ id: 'invalid-uuid' });
  
      expect(res.status).toBe(400); // Assuming invalid UUID results in 400 Bad Request
    });
  
    test('Get user info of non-existent user', async () => {
      const res = await supertest(server)
        .get('/api/v0/auth/userInfo')
        .set('Authorization', `Bearer ${lucaToken}`)
        .query({ id: invalidUserID });
  
      expect(res.status).toBe(400); // Assuming non-existent user results in 404 Not Found
    });
  });
  