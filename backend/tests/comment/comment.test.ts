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

const generateTestToken = (id: UUID, username: string, firstname: string, lastname: string) => {
const payload = { id: id, username: username, firstname: firstname, lastname: lastname };
return jwt.sign(payload, `${process.env.HASH_MASTER_SECRET}`, { expiresIn: '1h', algorithm: 'HS256' });
};

const lucaID = 'a3059ef4-971b-4e60-a692-a3af3365ba85';
const keatonID = '3b9a58b2-2a07-45d6-85c9-f138d63cb466';
const invalidUserID = 'bbbbbbbb-971b-4e60-a692-a3af3365ba85';

const lucaToken = generateTestToken(lucaID, 'lucaschram', 'Luca', 'Schram');
const keatonToken = generateTestToken(keatonID, 'keatonshawhan', 'Keaton', 'Shawhan');
const invalidToken = generateTestToken(invalidUserID, 'invalid', 'Invalid', 'User');

const validComment = 'This is a valid comment';
const validPostID = 'a5059ef4-971b-4e60-a692-a3af3365ba85'; // Post by Luca
const keatonPostID = 'a9359ef4-971b-4e60-a692-a3af3365ba85'; // Post by Keaton
const validCommentID = 'a6666ef4-971b-4e60-a692-a3af3365ba85';

describe('Basic Test Suite: Verify basic functionality of all endpoints', () => {
    test('Create a comment', async () => {
        const res = await supertest(server)
        .post('/api/v0/comment/create')
        .set('Authorization', `Bearer ${lucaToken}`)
        .query({ post: validPostID, text: validComment });

        expect(res.status).toBe(201);
    });

    test('Delete a comment', async () => {
        // First, create a comment to delete
        const createRes = await supertest(server)
        .post('/api/v0/comment/create')
        .set('Authorization', `Bearer ${keatonToken}`)
        .query({ post: validPostID, text: validComment });

        const commentID = createRes.body.id;

        const res = await supertest(server)
        .delete('/api/v0/comment/delete')
        .set('Authorization', `Bearer ${keatonToken}`)
        .query({ commentID: commentID });

        expect(res.status).toBe(204);
    });

    test('Get comments for a post', async () => {
        // Create comments to retrieve
        await supertest(server)
        .post('/api/v0/comment/create')
        .set('Authorization', `Bearer ${lucaToken}`)
        .query({ post: keatonPostID, text: 'First comment' });

        await supertest(server)
        .post('/api/v0/comment/create')
        .set('Authorization', `Bearer ${keatonToken}`)
        .query({ post: keatonPostID, text: 'Second comment' });

        const res = await supertest(server)
        .get('/api/v0/comment/getComments')
        .set('Authorization', `Bearer ${lucaToken}`)
        .query({ postId: keatonPostID });

        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBe(3);
    });

    test('Get comment count for a post', async () => {
        // Create comments to count
        await supertest(server)
        .post('/api/v0/comment/create')
        .set('Authorization', `Bearer ${lucaToken}`)
        .query({ post: keatonPostID, text: 'Another comment' });

        const res = await supertest(server)
        .get('/api/v0/comment/getCommentCount')
        .set('Authorization', `Bearer ${lucaToken}`)
        .query({ postId: keatonPostID });

        expect(res.status).toBe(200);
        expect(typeof res.body).toBe('number');
        expect(res.body).toBeGreaterThan(0);
    });
});

describe('Error Test Suite: Verify error handling of /comment/create endpoint', () => {
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

    test('Create a comment with empty text', async () => {
        const res = await supertest(server)
        .post('/api/v0/comment/create')
        .set('Authorization', `Bearer ${lucaToken}`)
        .query({ post: validPostID, text: '' });

        expect(res.status).toBe(400);
    });
});

describe('Error Test Suite: Verify error handling of /comment/delete endpoint', () => {
    test('Delete a comment with invalid token', async () => {
        const res = await supertest(server)
        .delete('/api/v0/comment/delete')
        .set('Authorization', `Bearer ${invalidToken}`)
        .query({ commentID: validCommentID });

        expect(res.status).toBe(400);
    });

    test('Delete a comment with invalid commentID', async () => {
        const res = await supertest(server)
        .delete('/api/v0/comment/delete')
        .set('Authorization', `Bearer ${lucaToken}`)
        .query({ commentID: 'invalidCommentID' });

        expect(res.status).toBe(400);
    });

    test('Delete a comment not owned by user', async () => {
        // Luca tries to delete Keatons's comment
        const res = await supertest(server)
        .delete('/api/v0/comment/delete')
        .set('Authorization', `Bearer ${lucaToken}`)
        .query({ commentID: validCommentID });

        expect(res.status).toBe(400);
    });
});

describe('Error Test Suite: Verify error handling of /comment/getComments endpoint', () => {
    test('Get comments with invalid postID', async () => {
        const res = await supertest(server)
        .get('/api/v0/comment/getComments')
        .set('Authorization', `Bearer ${lucaToken}`)
        .query({ postId: 'invalidPostID' });

        expect(res.status).toBe(400);
    });

    test('Get comments for post with no comments', async () => {
        const res = await supertest(server)
        .get('/api/v0/comment/getComments')
        .set('Authorization', `Bearer ${lucaToken}`)
        .query({ postId: validPostID });

        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBe(0);
    });
});

describe('Error Test Suite: Verify error handling of /comment/getCommentCount endpoint', () => {
    test('Get comment count with invalid postID', async () => {
        const res = await supertest(server)
        .get('/api/v0/comment/getCommentCount')
        .set('Authorization', `Bearer ${lucaToken}`)
        .query({ postId: 'invalidPostID' });

        expect(res.status).toBe(400);
    });

    test('Get comment count for post with no comments', async () => {
        const res = await supertest(server)
        .get('/api/v0/comment/getCommentCount')
        .set('Authorization', `Bearer ${lucaToken}`)
        .query({ postId: validPostID });

        expect(res.status).toBe(200);
        expect(res.body).toBe(0);
    });
});
