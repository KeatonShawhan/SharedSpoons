import supertest from 'supertest';
import * as http from 'http';
import app from '../../src/app'; // Adjust path as needed to your Express app
import * as db from '../db';
import jwt from 'jsonwebtoken';
import { UUID } from '../../src/types/index';

// Import necessary modules for mocking
import { commentService } from '../../src/comment/service';
import { S3Service } from '../../src/s3/service';

let server: http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>;

beforeAll(async () => {
  server = http.createServer(app);
  server.listen();
  await db.reset();
});

afterEach(async () => {
  jest.restoreAllMocks(); // Restore mocks after each test
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

const lucaToken = generateTestToken(lucaID, 'lucaschram', 'Luca', 'Schram');
const keatonToken = generateTestToken(keatonID, 'keatonshawhan', 'Keaton', 'Shawhan');

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
  });
});

describe('Error Test Suite: Verify error handling of /comment/create endpoint', () => {
  test('Create a comment without authorization token', async () => {
    const res = await supertest(server)
      .post('/api/v0/comment/create')
      .query({ post: validPostID, text: validComment });

    expect(res.status).toBe(401);
  });

  test('Create a comment with invalid token', async () => {
    const res = await supertest(server)
      .post('/api/v0/comment/create')
      .set('Authorization', `Bearer invalidtoken`)
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

  test('Create a comment when service returns undefined', async () => {
    // Mock the commentService to return undefined
    jest.spyOn(commentService.prototype, 'createComment').mockResolvedValue(undefined);

    const res = await supertest(server)
      .post('/api/v0/comment/create')
      .set('Authorization', `Bearer ${lucaToken}`)
      .query({ post: validPostID, text: validComment });

    expect(res.status).toBe(400);
  });

  test('Create a comment when an exception is thrown', async () => {
    // Mock the commentService to throw an error
    jest.spyOn(commentService.prototype, 'createComment').mockImplementation(() => {
      throw new Error('Database error');
    });

    const res = await supertest(server)
      .post('/api/v0/comment/create')
      .set('Authorization', `Bearer ${lucaToken}`)
      .query({ post: validPostID, text: validComment });

    expect(res.status).toBe(500);
  });
});

describe('Error Test Suite: Verify error handling of /comment/delete endpoint', () => {
  test('Delete a comment without authorization token', async () => {
    const res = await supertest(server)
      .delete('/api/v0/comment/delete')
      .query({ commentID: validCommentID });

    expect(res.status).toBe(401);
  });

  test('Delete a comment with invalid token', async () => {
    const res = await supertest(server)
      .delete('/api/v0/comment/delete')
      .set('Authorization', `Bearer invalidtoken`)
      .query({ commentID: validCommentID });

    expect(res.status).toBe(401);
  });

  test('Delete a comment with invalid commentID', async () => {
    const res = await supertest(server)
      .delete('/api/v0/comment/delete')
      .set('Authorization', `Bearer ${lucaToken}`)
      .query({ commentID: 'invalidCommentID' });

    expect(res.status).toBe(400);
  });

  test('Delete a comment not owned by user', async () => {
    // Luca tries to delete Keaton's comment
    const res = await supertest(server)
      .delete('/api/v0/comment/delete')
      .set('Authorization', `Bearer ${lucaToken}`)
      .query({ commentID: validCommentID });

    expect(res.status).toBe(400);
  });

  test('Delete a comment when service returns undefined', async () => {
    // Mock the commentService to return undefined
    jest.spyOn(commentService.prototype, 'deleteComment').mockResolvedValue(undefined);

    const res = await supertest(server)
      .delete('/api/v0/comment/delete')
      .set('Authorization', `Bearer ${keatonToken}`)
      .query({ commentID: validCommentID });

    expect(res.status).toBe(400);
  });

  test('Delete a comment when an exception is thrown', async () => {
    // Mock the commentService to throw an error
    jest.spyOn(commentService.prototype, 'deleteComment').mockImplementation(() => {
      throw new Error('Database error');
    });

    const res = await supertest(server)
      .delete('/api/v0/comment/delete')
      .set('Authorization', `Bearer ${keatonToken}`)
      .query({ commentID: validCommentID });

    expect(res.status).toBe(500);
  });
});

describe('Error Test Suite: Verify error handling of /comment/getComments endpoint', () => {
  test('Get comments without authorization token', async () => {
    const res = await supertest(server)
      .get('/api/v0/comment/getComments')
      .query({ postId: keatonPostID });

    expect(res.status).toBe(401);
  });

  test('Get comments with invalid token', async () => {
    const res = await supertest(server)
      .get('/api/v0/comment/getComments')
      .set('Authorization', `Bearer invalidtoken`)
      .query({ postId: keatonPostID });

    expect(res.status).toBe(401);
  });

  test('Get comments with invalid postID', async () => {
    const res = await supertest(server)
      .get('/api/v0/comment/getComments')
      .set('Authorization', `Bearer ${lucaToken}`)
      .query({ postId: 'invalidPostID' });

    expect(res.status).toBe(400);
  });

  test('Get comments when service returns undefined', async () => {
    // Mock the commentService to return undefined
    jest.spyOn(commentService.prototype, 'getComments').mockResolvedValue(undefined);

    const res = await supertest(server)
      .get('/api/v0/comment/getComments')
      .set('Authorization', `Bearer ${lucaToken}`)
      .query({ postId: keatonPostID });

    expect(res.status).toBe(400);
  });

  test('Get comments when S3Service.getFileLink fails', async () => {
    // Mock S3Service to return undefined
    jest.spyOn(S3Service.prototype, 'getFileLink').mockResolvedValue(undefined);

    const res = await supertest(server)
      .get('/api/v0/comment/getComments')
      .set('Authorization', `Bearer ${lucaToken}`)
      .query({ postId: keatonPostID });

    expect(res.status).toBe(400);
  });

  test('Get comments when an exception is thrown', async () => {
    // Mock the commentService to throw an error
    jest.spyOn(commentService.prototype, 'getComments').mockImplementation(() => {
      throw new Error('Database error');
    });

    const res = await supertest(server)
      .get('/api/v0/comment/getComments')
      .set('Authorization', `Bearer ${lucaToken}`)
      .query({ postId: keatonPostID });

    expect(res.status).toBe(500);
  });
});

describe('Error Test Suite: Verify error handling of /comment/getCommentCount endpoint', () => {
  test('Get comment count without authorization token', async () => {
    const res = await supertest(server)
      .get('/api/v0/comment/getCommentCount')
      .query({ postId: keatonPostID });

    expect(res.status).toBe(401);
  });

  test('Get comment count with invalid token', async () => {
    const res = await supertest(server)
      .get('/api/v0/comment/getCommentCount')
      .set('Authorization', `Bearer invalidtoken`)
      .query({ postId: keatonPostID });

    expect(res.status).toBe(401);
  });

  test('Get comment count with invalid postID', async () => {
    const res = await supertest(server)
      .get('/api/v0/comment/getCommentCount')
      .set('Authorization', `Bearer ${lucaToken}`)
      .query({ postId: 'invalidPostID' });

    expect(res.status).toBe(400);
  });

  test('Get comment count when service returns undefined', async () => {
    // Mock the commentService to return undefined
    jest.spyOn(commentService.prototype, 'getCommentsCount').mockResolvedValue(undefined);

    const res = await supertest(server)
      .get('/api/v0/comment/getCommentCount')
      .set('Authorization', `Bearer ${lucaToken}`)
      .query({ postId: keatonPostID });

    expect(res.status).toBe(400);
  });

  test('Get comment count when an exception is thrown', async () => {
    // Mock the commentService to throw an error
    jest.spyOn(commentService.prototype, 'getCommentsCount').mockImplementation(() => {
      throw new Error('Database error');
    });

    const res = await supertest(server)
      .get('/api/v0/comment/getCommentCount')
      .set('Authorization', `Bearer ${lucaToken}`)
      .query({ postId: keatonPostID });

    expect(res.status).toBe(500);
  });
});
