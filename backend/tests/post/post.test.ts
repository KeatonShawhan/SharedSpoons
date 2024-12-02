import supertest from 'supertest';
import * as http from 'http';
import app from '../../src/app'; // Adjust path as needed to your Express app
import * as db from '../db';
import { S3Service } from '../../src/s3/service';
import { postService } from '../../src/post/service';
import jwt from 'jsonwebtoken';
import { UUID } from '../../src/types/index';

let server: http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>;

beforeAll(async () => {
  server = http.createServer(app);
  server.listen();
  await db.reset();
});

beforeEach(async () => {
  jest.clearAllMocks();
  jest.spyOn(S3Service.prototype, 'uploadFile').mockImplementation(async () => {
    // Return a mock S3 key
    return 'mock-s3-key.jpg';
  });

  jest.spyOn(S3Service.prototype, 'getFileLink').mockImplementation(async (s3Key) => {
    // Return a mock URL for the given S3 key
    if (s3Key === 'mock-s3-key.jpg') {
      return 'https://mock-s3-url.com/mock-s3-key.jpg';
    } else {
      return undefined; // Simulate failure for other keys
    }
  });
});

afterEach(async () => {
  jest.restoreAllMocks();
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
const invalidToken = 'invalidtoken';

const validTestPostData = {
  rating: 5,
  restaurant: 'McDonalds',
  dish: 'Big Mac',
  caption: 'I love Big Macs',
};

describe('Post Endpoints Test Suite', () => {
  /**
   * Tests for /post/create endpoint
   */
  describe('/post/create Endpoint', () => {
    test('Create post successfully', async () => {
      const res = await supertest(server)
        .post('/api/v0/post/create')
        .set('Content-Type', 'multipart/form-data')
        .set('Authorization', `Bearer ${lucaToken}`)
        .field('post', JSON.stringify(validTestPostData))
        .attach('file', '/usr/src/app/tests/testcat.jpg');

      expect(res.status).toBe(201);
    });

    test('Create post without authorization token returns 401', async () => {
      const res = await supertest(server)
        .post('/api/v0/post/create')
        .set('Content-Type', 'multipart/form-data')
        .field('post', JSON.stringify(validTestPostData))
        .attach('file', '/usr/src/app/tests/testcat.jpg');

      expect(res.status).toBe(401);
    });

    test('Create post with invalid token returns 401', async () => {
      const res = await supertest(server)
        .post('/api/v0/post/create')
        .set('Content-Type', 'multipart/form-data')
        .set('Authorization', `Bearer ${invalidToken}`)
        .field('post', JSON.stringify(validTestPostData))
        .attach('file', '/usr/src/app/tests/testcat.jpg');

      expect(res.status).toBe(401);
    });

    test('Create post with missing post field returns 400', async () => {
      const res = await supertest(server)
        .post('/api/v0/post/create')
        .set('Content-Type', 'multipart/form-data')
        .set('Authorization', `Bearer ${lucaToken}`)
        .attach('file', '/usr/src/app/tests/testcat.jpg');

      expect(res.status).toBe(400);
    });

    test('Create post with invalid JSON in post field returns 500', async () => {
      const res = await supertest(server)
        .post('/api/v0/post/create')
        .set('Content-Type', 'multipart/form-data')
        .set('Authorization', `Bearer ${lucaToken}`)
        .field('post', 'invalid-json')
        .attach('file', '/usr/src/app/tests/testcat.jpg');

      expect(res.status).toBe(500);
    });

    test('Create post with invalid post data (validation failure) returns 400', async () => {
      const invalidPostData = { 
        restaurant: 'McDonalds',
        dish: 'Big Mac',
        caption: 'I love Big Macs',
       };

      const res = await supertest(server)
        .post('/api/v0/post/create')
        .set('Content-Type', 'multipart/form-data')
        .set('Authorization', `Bearer ${lucaToken}`)
        .field('post', JSON.stringify(invalidPostData))
        .attach('file', '/usr/src/app/tests/testcat.jpg');

      expect(res.status).toBe(400);
    });

    test('Create post with invalid file type returns 400', async () => {
      const res = await supertest(server)
        .post('/api/v0/post/create')
        .set('Content-Type', 'multipart/form-data')
        .set('Authorization', `Bearer ${lucaToken}`)
        .field('post', JSON.stringify(validTestPostData))
        .attach('file', '/usr/src/app/tests/testcat.txt');

      expect(res.status).toBe(400);
    });

    test('Create post when s3Service.uploadFile returns undefined returns 400', async () => {
      jest.spyOn(S3Service.prototype, 'uploadFile').mockResolvedValue(undefined);

      const res = await supertest(server)
        .post('/api/v0/post/create')
        .set('Content-Type', 'multipart/form-data')
        .set('Authorization', `Bearer ${lucaToken}`)
        .field('post', JSON.stringify(validTestPostData))
        .attach('file', '/usr/src/app/tests/testcat.jpg');

      expect(res.status).toBe(400);
    });

    test('Create post when postService.createPost returns undefined returns 400', async () => {
      jest.spyOn(postService.prototype, 'createPost').mockResolvedValue(undefined);

      const res = await supertest(server)
        .post('/api/v0/post/create')
        .set('Content-Type', 'multipart/form-data')
        .set('Authorization', `Bearer ${lucaToken}`)
        .field('post', JSON.stringify(validTestPostData))
        .attach('file', '/usr/src/app/tests/testcat.jpg');

      expect(res.status).toBe(400);
    });

    test('Create post when an exception is thrown returns 500', async () => {
      jest.spyOn(postService.prototype, 'createPost').mockImplementation(() => {
        throw new Error('Database error');
      });

      const res = await supertest(server)
        .post('/api/v0/post/create')
        .set('Content-Type', 'multipart/form-data')
        .set('Authorization', `Bearer ${lucaToken}`)
        .field('post', JSON.stringify(validTestPostData))
        .attach('file', '/usr/src/app/tests/testcat.jpg');

      expect(res.status).toBe(500);
    });
  });

  /**
   * Tests for /post/delete endpoint
   */
  describe('/post/delete Endpoint', () => {
    const validLucaPostID = 'a5059ef4-971b-4e60-a692-a3af3365ba85';
    const validKeatonPostID = 'a9359ef4-971b-4e60-a692-a3af3365ba85';

    test('Delete post successfully', async () => {
      const res = await supertest(server)
        .delete('/api/v0/post/delete')
        .set('Authorization', `Bearer ${lucaToken}`)
        .query({ postID: validLucaPostID });

      expect(res.status).toBe(200);
    });

    test('Delete post without authorization token returns 401', async () => {
      const res = await supertest(server)
        .delete('/api/v0/post/delete')
        .query({ postID: validLucaPostID });

      expect(res.status).toBe(401);
    });

    test('Delete post with invalid token returns 401', async () => {
      const res = await supertest(server)
        .delete('/api/v0/post/delete')
        .set('Authorization', `Bearer invalidtoken`)
        .query({ postID: validLucaPostID });

      expect(res.status).toBe(401);
    });

    test('Delete post with invalid postID returns 400', async () => {
      const invalidPostID = 'invalid-id';
      const res = await supertest(server)
        .delete('/api/v0/post/delete')
        .set('Authorization', `Bearer ${lucaToken}`)
        .query({ postID: invalidPostID });

      expect(res.status).toBe(400);
    });

    test('Delete post when postService.deletePost returns undefined returns 400', async () => {
      jest.spyOn(postService.prototype, 'deletePost').mockResolvedValue(undefined);

      const res = await supertest(server)
        .delete('/api/v0/post/delete')
        .set('Authorization', `Bearer ${lucaToken}`)
        .query({ postID: validLucaPostID });

      expect(res.status).toBe(400);
    });

    test('Delete post when an exception is thrown returns 500', async () => {
      jest.spyOn(postService.prototype, 'deletePost').mockImplementation(() => {
        throw new Error('Database error');
      });

      const res = await supertest(server)
        .delete('/api/v0/post/delete')
        .set('Authorization', `Bearer ${lucaToken}`)
        .query({ postID: validLucaPostID });

      expect(res.status).toBe(500);
    });

    test('Delete post with unauthorized user returns 400', async () => {
      // Attempt to delete Keaton's post with Luca's token
      const res = await supertest(server)
        .delete('/api/v0/post/delete')
        .set('Authorization', `Bearer ${lucaToken}`)
        .query({ postID: validKeatonPostID });

      expect(res.status).toBe(400);
    });
  });

  /**
   * Tests for /post/postID/{postID} endpoint
   */
  describe('/post/postID/{postID} Endpoint', () => {
    const validPostID = 'a5059ef4-971b-4e60-a692-a3af3365ba85';

    test('Get post successfully', async () => {
      const res = await supertest(server)
        .get(`/api/v0/post/postID/${validPostID}`)
        .set('Authorization', `Bearer ${lucaToken}`);

      expect(res.status).toBe(200);
    });

    test('Get post without authorization token returns 401', async () => {
      const res = await supertest(server)
        .get(`/api/v0/post/postID/${validPostID}`);

      expect(res.status).toBe(401);
    });

    test('Get post with invalid token returns 401', async () => {
      const res = await supertest(server)
        .get(`/api/v0/post/postID/${validPostID}`)
        .set('Authorization', `Bearer invalidtoken`);

      expect(res.status).toBe(401);
    });

    test('Get post with invalid postID returns 400', async () => {
      const invalidPostID = 'invalid-id';
      const res = await supertest(server)
        .get(`/api/v0/post/postID/${invalidPostID}`)
        .set('Authorization', `Bearer ${lucaToken}`);

      expect(res.status).toBe(400);
    });

    test('Get post when postService.getPost returns undefined returns 400', async () => {
      jest.spyOn(postService.prototype, 'getPost').mockResolvedValue(undefined);

      const res = await supertest(server)
        .get(`/api/v0/post/postID/${validPostID}`)
        .set('Authorization', `Bearer ${lucaToken}`);

      expect(res.status).toBe(400);
    });

    test('Get post when s3Service.getFileLink for image returns undefined returns 400', async () => {
      jest.spyOn(S3Service.prototype, 'getFileLink').mockResolvedValueOnce(undefined);

      const res = await supertest(server)
        .get(`/api/v0/post/postID/${validPostID}`)
        .set('Authorization', `Bearer ${lucaToken}`);

      expect(res.status).toBe(400);
    });

    test('Get post when an exception is thrown returns 500', async () => {
      jest.spyOn(postService.prototype, 'getPost').mockImplementation(() => {
        throw new Error('Database error');
      });

      const res = await supertest(server)
        .get(`/api/v0/post/postID/${validPostID}`)
        .set('Authorization', `Bearer ${lucaToken}`);

      expect(res.status).toBe(500);
    });
  });

  /**
   * Tests for /post/all/{userID} endpoint
   */
  describe('/post/all/{userID} Endpoint', () => {
    const validUserID = lucaID;

    test('Get all posts successfully', async () => {
      const res = await supertest(server)
        .get(`/api/v0/post/all/${validUserID}`)
        .set('Authorization', `Bearer ${lucaToken}`);

      expect(res.status).toBe(200);
    });

    test('Get all posts without authorization token returns 401', async () => {
      const res = await supertest(server)
        .get(`/api/v0/post/all/${validUserID}`);

      expect(res.status).toBe(401);
    });

    test('Get all posts with invalid token returns 401', async () => {
      const res = await supertest(server)
        .get(`/api/v0/post/all/${validUserID}`)
        .set('Authorization', `Bearer invalidtoken`);

      expect(res.status).toBe(401);
    });

    test('Get all posts with invalid userID returns 400', async () => {
      const invalidUserID = 'invalid-id';

      const res = await supertest(server)
        .get(`/api/v0/post/all/${invalidUserID}`)
        .set('Authorization', `Bearer ${lucaToken}`);

      expect(res.status).toBe(400);
    });

    test('Get all posts when postService.getAllPosts returns undefined returns 400', async () => {
      jest.spyOn(postService.prototype, 'getAllPosts').mockResolvedValue(undefined);

      const res = await supertest(server)
        .get(`/api/v0/post/all/${validUserID}`)
        .set('Authorization', `Bearer ${lucaToken}`);

      expect(res.status).toBe(400);
    });

    test('Get all posts when s3Service.getFileLink fails returns 400', async () => {
      jest.spyOn(S3Service.prototype, 'getFileLink').mockResolvedValue(undefined);

      const res = await supertest(server)
        .get(`/api/v0/post/all/${validUserID}`)
        .set('Authorization', `Bearer ${lucaToken}`);

      expect(res.status).toBe(400);
    });

    test('Get all posts when an exception is thrown returns 500', async () => {
      jest.spyOn(postService.prototype, 'getAllPosts').mockImplementation(() => {
        throw new Error('Database error');
      });

      const res = await supertest(server)
        .get(`/api/v0/post/all/${validUserID}`)
        .set('Authorization', `Bearer ${lucaToken}`);

      expect(res.status).toBe(500);
    });
  });

  /**
   * Tests for /post/edit/{postID} endpoint
   */
  describe('/post/edit/{postID} Endpoint', () => {
    const validPostID = 'a5059ef4-971b-4e60-a692-a3af3365ba85';

    test('Edit post successfully', async () => {
      const res = await supertest(server)
        .put(`/api/v0/post/edit/${validPostID}`)
        .set('Authorization', `Bearer ${lucaToken}`)
        .query({ rating: 4, caption: 'Updated caption' });

      expect(res.status).toBe(200);
    });

    test('Edit post without authorization token returns 401', async () => {
      const res = await supertest(server)
        .put(`/api/v0/post/edit/${validPostID}`)
        .query({ rating: 4, caption: 'Updated caption' });

      expect(res.status).toBe(401);
    });

    test('Edit post with invalid token returns 401', async () => {
      const res = await supertest(server)
        .put(`/api/v0/post/edit/${validPostID}`)
        .set('Authorization', `Bearer invalidtoken`)
        .query({ rating: 4, caption: 'Updated caption' });

      expect(res.status).toBe(401);
    });

    test('Edit post with invalid postID returns 400', async () => {
      const invalidPostID = 'invalid-id';

      const res = await supertest(server)
        .put(`/api/v0/post/edit/${invalidPostID}`)
        .set('Authorization', `Bearer ${lucaToken}`)
        .query({ rating: 4, caption: 'Updated caption' });

      expect(res.status).toBe(400);
    });

    test('Edit post with invalid data (validation failure) returns 400', async () => {
      const res = await supertest(server)
        .put(`/api/v0/post/edit/${validPostID}`)
        .set('Authorization', `Bearer ${lucaToken}`)
        .query({ rating: 6, caption: 'Updated caption' }); // Rating out of valid range

      expect(res.status).toBe(400);
    });

    test('Edit post when postService.editPost returns undefined returns 400', async () => {
      jest.spyOn(postService.prototype, 'editPost').mockResolvedValue(undefined);

      const res = await supertest(server)
        .put(`/api/v0/post/edit/${validPostID}`)
        .set('Authorization', `Bearer ${lucaToken}`)
        .query({ rating: 4, caption: 'Updated caption' });

      expect(res.status).toBe(400);
    });

    test('Edit post when an exception is thrown returns 500', async () => {
      jest.spyOn(postService.prototype, 'editPost').mockImplementation(() => {
        throw new Error('Database error');
      });

      const res = await supertest(server)
        .put(`/api/v0/post/edit/${validPostID}`)
        .set('Authorization', `Bearer ${lucaToken}`)
        .query({ rating: 4, caption: 'Updated caption' });

      expect(res.status).toBe(500);
    });
  });

  /**
   * Tests for /post/all/friendsPosts/{userID} endpoint
   */
  describe('/post/all/friendsPosts/{userID} Endpoint', () => {
    const validUserID = keatonID;

    test('Get friends posts successfully', async () => {
      const res = await supertest(server)
        .get(`/api/v0/post/all/friendsPosts/${validUserID}`)
        .set('Authorization', `Bearer ${keatonToken}`)
        .query({ limit: 10, lastPostTime: '2023-10-01T00:00:00Z' });

      expect(res.status).toBe(200);
    });

    test('Get friends posts without authorization token returns 401', async () => {
      const res = await supertest(server)
        .get(`/api/v0/post/all/friendsPosts/${validUserID}`)
        .query({ limit: 10, lastPostTime: '2023-10-01T00:00:00Z' });

      expect(res.status).toBe(401);
    });

    test('Get friends posts with invalid token returns 401', async () => {
      const res = await supertest(server)
        .get(`/api/v0/post/all/friendsPosts/${validUserID}`)
        .set('Authorization', `Bearer invalidtoken`)
        .query({ limit: 10, lastPostTime: '2023-10-01T00:00:00Z' });

      expect(res.status).toBe(401);
    });

    test('Get friends posts with invalid userID returns 400', async () => {
      const invalidUserID = 'invalid-id';
      const res = await supertest(server)
        .get(`/api/v0/post/all/friendsPosts/${invalidUserID}`)
        .set('Authorization', `Bearer ${keatonToken}`)
        .query({ limit: 10, lastPostTime: '2023-10-01T00:00:00Z' });

      expect(res.status).toBe(400);
    });

    test('Get friends posts when postService.getAllFriendsPosts returns undefined returns 400', async () => {
      jest.spyOn(postService.prototype, 'getAllFriendsPosts').mockResolvedValue(undefined);

      const res = await supertest(server)
        .get(`/api/v0/post/all/friendsPosts/${validUserID}`)
        .set('Authorization', `Bearer ${keatonToken}`)
        .query({ limit: 10, lastPostTime: '2023-10-01T00:00:00Z' });

      expect(res.status).toBe(400);
    });

    test('Get friends posts when s3Service.getFileLink fails returns 400', async () => {
      jest.spyOn(S3Service.prototype, 'getFileLink').mockResolvedValue(undefined);

      const res = await supertest(server)
        .get(`/api/v0/post/all/friendsPosts/${lucaID}`)
        .set('Authorization', `Bearer ${lucaToken}`)

      expect(res.status).toBe(400);
    });

    test('Get friends posts when an exception is thrown returns 500', async () => {
      jest.spyOn(postService.prototype, 'getAllFriendsPosts').mockImplementation(() => {
        throw new Error('Database error');
      });

      const res = await supertest(server)
        .get(`/api/v0/post/all/friendsPosts/${validUserID}`)
        .set('Authorization', `Bearer ${keatonToken}`)
        .query({ limit: 10, lastPostTime: '2023-10-01T00:00:00Z' });

      expect(res.status).toBe(500);
    });
  });

  /**
   * Tests for /post/add/repost endpoint
   */
  describe('/post/add/repost Endpoint', () => {
    const validPostID = 'a5059ef4-971b-4e60-a692-a3af3365ba85';

    test('Add repost successfully', async () => {
      const res = await supertest(server)
        .post('/api/v0/post/add/repost')
        .set('Authorization', `Bearer ${lucaToken}`)
        .query({ postId: validPostID, userId: keatonID });

      expect(res.status).toBe(200);
    });

    test('Add repost without authorization token returns 401', async () => {
      const res = await supertest(server)
        .post('/api/v0/post/add/repost')
        .query({ postId: validPostID, userId: lucaID });

      expect(res.status).toBe(401);
    });

    test('Add repost with invalid token returns 401', async () => {
      const res = await supertest(server)
        .post('/api/v0/post/add/repost')
        .set('Authorization', `Bearer invalidtoken`)
        .query({ postId: validPostID, userId: lucaID });

      expect(res.status).toBe(401);
    });

    test('Add repost with invalid postId returns 400', async () => {
      const invalidPostID = 'invalid-id';

      const res = await supertest(server)
        .post('/api/v0/post/add/repost')
        .set('Authorization', `Bearer ${lucaToken}`)
        .query({ postId: invalidPostID, userId: lucaID });

      expect(res.status).toBe(400);
    });

    test('Add repost when postService.addRepost returns undefined returns 400', async () => {
      jest.spyOn(postService.prototype, 'addRepost').mockResolvedValue(undefined);

      const res = await supertest(server)
        .post('/api/v0/post/add/repost')
        .set('Authorization', `Bearer ${lucaToken}`)
        .query({ postId: validPostID, userId: lucaID });

      expect(res.status).toBe(400);
    });

    test('Add repost when an exception is thrown returns 500', async () => {
      jest.spyOn(postService.prototype, 'addRepost').mockImplementation(() => {
        throw new Error('Database error');
      });

      const res = await supertest(server)
        .post('/api/v0/post/add/repost')
        .set('Authorization', `Bearer ${lucaToken}`)
        .query({ postId: validPostID, userId: lucaID });

      expect(res.status).toBe(500);
    });
  });

  /**
   * Tests for /post/get/repost endpoint
   */
  describe('/post/get/repost Endpoint', () => {
    const validPostID = 'a5059ef4-971b-4e60-a692-a3af3365ba85';

    test('Get repost successfully', async () => {
      jest.spyOn(postService.prototype, 'getRepost').mockResolvedValue('repost-id');
      const res = await supertest(server)
        .get('/api/v0/post/get/repost')
        .set('Authorization', `Bearer ${lucaToken}`)
        .query({ postId: validPostID });

      expect(res.status).toBe(200);
    });

    test('Get repost without authorization token returns 401', async () => {
      const res = await supertest(server)
        .get('/api/v0/post/get/repost')
        .query({ postId: validPostID });

      expect(res.status).toBe(401);
    });

    test('Get repost with invalid token returns 401', async () => {
      const res = await supertest(server)
        .get('/api/v0/post/get/repost')
        .set('Authorization', `Bearer invalidtoken`)
        .query({ postId: validPostID });

      expect(res.status).toBe(401);
    });

    test('Get repost with invalid postId returns 400', async () => {
      const invalidPostID = 'invalid-id';

      const res = await supertest(server)
        .get('/api/v0/post/get/repost')
        .set('Authorization', `Bearer ${lucaToken}`)
        .query({ postId: invalidPostID });

      expect(res.status).toBe(400);
    });

    test('Get repost when postService.getRepost returns undefined returns 400', async () => {
      jest.spyOn(postService.prototype, 'getRepost').mockResolvedValue(undefined);

      const res = await supertest(server)
        .get('/api/v0/post/get/repost')
        .set('Authorization', `Bearer ${lucaToken}`)
        .query({ postId: validPostID });

      expect(res.status).toBe(400);
    });

    test('Get repost when an exception is thrown returns 500', async () => {
      jest.spyOn(postService.prototype, 'getRepost').mockImplementation(() => {
        throw new Error('Database error');
      });

      const res = await supertest(server)
        .get('/api/v0/post/get/repost')
        .set('Authorization', `Bearer ${lucaToken}`)
        .query({ postId: validPostID });

      expect(res.status).toBe(500);
    });
  });
});