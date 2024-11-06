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

afterAll((done) => {
  db.shutdown();
  server.close(done);
});

const generateTestToken = ( id:UUID, username:string, firstname:string, lastname:string ) => {
  const payload = { id:id, isername:username, firstname:firstname, lastname:lastname };
  return jwt.sign(payload, `${process.env.HASH_MASTER_SECRET}`, { expiresIn: '1h', algorithm: 'HS256' });
};

const lucaToken = generateTestToken('a3059ef4-971b-4e60-a692-a3af3365ba85', 'lucaschram', 'Luca', 'Schram');
const keatonToken = generateTestToken('3b9a58b2-2a07-45d6-85c9-f138d63cb466', 'keatonshawhan', 'Keaton', 'Shawhan');
const invalidToken = generateTestToken('bbbbbbbb-971b-4e60-a692-a3af3365ba85', 'invalid', 'Invalid', 'User');

const validComment = 'this is a valid comment';
const validPostID = 'a5059ef4-971b-4e60-a692-a3af3365ba85';
const validCommentID = 'a6666ef4-971b-4e60-a692-a3af3365ba85';

describe('Basic Test Suite: Verify Basic functionality of all endpts', () => {
    test('Create a comment', async () => {
        const res = await supertest(server)
            .post('/api/v0/comment/create')
            .set('Authorization', `Bearer ${lucaToken}`)
            .query({ post: validPostID, text: validComment });
        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty('id');
        expect(res.body).toHaveProperty('user');
        expect(res.body).toHaveProperty('comment');
        expect(res.body).toHaveProperty('time');
    });
    test('Delete a comment', async () => {
        const res = await supertest(server)
            .delete('/api/v0/comment/delete')
            .set('Authorization', `Bearer ${keatonToken}`)
            .query({ commentId: validCommentID });
        expect(res.status).toBe(204);
    });
});

describe('Error Test Suite: Verify error handling of comment/create endpt', () => {
    test('Create a comment with nonexistent token', async () => {
        const res = await supertest(server)
            .post('/api/v0/comment/create')
            .query({ post: validPostID, text: validComment });
        expect(res.status).toBe(401);
    });
    test('Create a comment with invalid postID', async () => {
        const res = await supertest(server)
            .post('/api/v0/comment/create')
            .set('Authorization', `Bearer ${lucaToken}`)
            .query({ post: 'invalidPostID', text: validComment });
        expect(res.status).toBe(400);
    });
    test('Create a comment with invalid comment', async () => {
        const res = await supertest(server)
            .post('/api/v0/comment/create')
            .set('Authorization', `Bearer ${lucaToken}`)
            .query({ post: validPostID, text: '' });
        expect(res.status).toBe(400);
    });
});

describe('Error Test Suite: Verify error handling of comment/delete endpt', () => {
    test('Delete a comment with invalid token', async () => {
        const res = await supertest(server)
            .delete('/api/v0/comment/delete')
            .set('Authorization', `Bearer ${invalidToken}`)
            .query({ commentId: validCommentID });
        expect(res.status).toBe(400);
    });
    test('Delete a comment with invalid commentID', async () => {
        const res = await supertest(server)
            .delete('/api/v0/comment/delete')
            .set('Authorization', `Bearer ${lucaToken}`)
            .query({ commentId: 'invalidCommentID' });
        expect(res.status).toBe(400);
    });
});