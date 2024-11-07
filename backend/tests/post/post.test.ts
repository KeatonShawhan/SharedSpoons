//post.test.ts
import supertest from 'supertest';
import * as http from 'http';
import app from '../../src/app'; // Adjust path as needed to your Express app
import * as db from '../db';
import { S3Service } from '../../src/s3/service';
import jwt from 'jsonwebtoken';
import {UUID} from '../../src/types/index';
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

const validTestPostData = { // luca data
  rating: 5,
  restaurant: 'McDonalds',
  dish: 'Big Mac',
  caption: 'I love Big Macs'
}

const invalidUserPostData = {
  rating: 1,
  restaurant: 'Banana Stand',
  dish: 'Banana',
  caption: 'I love bananas'
}

const invalidDataPostData = { // luca data
  gobbledegook: 5,
  restaurant: 'McDonalds',
  caption: 'This should not work'
}

// Basic Test Suite First and foremost
describe('Basic Test Suite: Verify Basic functionality of all endpts', () => {
  test('Testing post/create endpoint - Will create a post under lucaschram account', async () => {
    return await supertest(server)
    .post('/api/v0/post/create')
    .set('Content-Type', 'multipart/form-data')
    .set('authorization', `Bearer ${lucaToken}`)
    .field('post', JSON.stringify(validTestPostData))
    .attach('file', '/usr/src/app/tests/testcat.jpg')
    .expect(201)
  });

  test('Testing post/delete endpoint - Will delete a post under keatonshawhan account', async () => {
    return await supertest(server)
    .delete('/api/v0/post/delete')
    .set('Authorization', `Bearer ${keatonToken}`)
    .query({postID : 'a9359ef4-971b-4e60-a692-a3af3365ba85'})
    .expect(200)
  });

  test('Testing post/all/{userID} endpoint - Will get all lucaschram posts', async () => {
    return await supertest(server)
    .get('/api/v0/post/all/a3059ef4-971b-4e60-a692-a3af3365ba85')
    .set('Authorization', `Bearer ${lucaToken}`)
    .expect(200)
  });

  test('Testing post/postID/{postID} endpoint - Will get a lucaschram post, but accessible by any user', async () => {
    return await supertest(server)
    .get('/api/v0/post/postID/a5059ef4-971b-4e60-a692-a3af3365ba85')
    .set('Authorization', `Bearer ${keatonToken}`)
    .expect(200)
  });

  test('Testing post/edit endpoint - Will edit a lucaschram post', async () => {
    const response = await supertest(server)
    .put('/api/v0/post/edit/a5059ef4-971b-4e60-a692-a3af3365ba85')
    .set('Authorization', `Bearer ${lucaToken}`)
    .query({rating: 2, caption: 'I hate Big Macs!'})
    .expect(200)

    expect(response.body).toBeDefined();
    const resJson = JSON.parse(response.body);
    expect(resJson.rating).toBe("2");
    expect(resJson.caption).toBe('I hate Big Macs!');
  });

});

// post/create error testing suite
describe('Error Test Suite: Verify error handling of post/create', () => {
  test('Testing post/create endpoint with INVALID USER TOKEN', async () => {
    return await supertest(server)
    .post('/api/v0/post/create')
    .set('Content-Type', 'multipart/form-data')
    .set('authorization', `Bearer ${invalidToken}`)
    .field('post', JSON.stringify(invalidUserPostData))
    .attach('file', '/usr/src/app/tests/testcat.jpg')
    .expect(400)
  });
  test('Testing post/create endpoint with NON-JSON POST DATA', async () => {
    return await supertest(server)
    .post('/api/v0/post/create')
    .set('Content-Type', 'multipart/form-data')
    .set('authorization', `Bearer ${lucaToken}`)
    .field('post', 'abcadaba')
    .attach('file', '/usr/src/app/tests/testcat.jpg')
    .expect(500)
  });
  test('Testing post/create endpoint with INVALID POST DATA', async () => {
    return await supertest(server)
    .post('/api/v0/post/create')
    .set('Content-Type', 'multipart/form-data')
    .set('authorization', `Bearer ${lucaToken}`)
    .field('post', JSON.stringify(invalidDataPostData))
    .attach('file', '/usr/src/app/tests/testcat.jpg')
    .expect(400)
  });
  test('Testing post/create endpoint with INVALID FILE', async () => {
    return await supertest(server)
    .post('/api/v0/post/create')
    .set('Content-Type', 'multipart/form-data')
    .set('authorization', `Bearer ${lucaToken}`)
    .field('post', JSON.stringify(validTestPostData))
    .attach('file', '/usr/src/app/tests/testcat.txt')
    .expect(400)
  });

});

// post/get/{PostID} error testing suite
describe('Error Test Suite: Verify error handling of post/get/{PostID}', () => {

  const validPostID = 'a5059ef4-971b-4e60-a692-a3af3365ba85';

  // Test for a successful post retrieval
  test('Get post with VALID POST ID', async () => {
    const response = await supertest(server)
      .get(`/api/v0/post/postID/${validPostID}`)
      .set('Authorization', `Bearer ${lucaToken}`)
      .expect(200);

    expect(response.body).toBeDefined();
    expect(response.body.id).toBe(validPostID);
    expect(response.body.data).toHaveProperty('image');
  });

  // Test for retrieval attempt with invalid post ID format
  test('Get post with INVALID POST ID FORMAT', async () => {
    const invalidPostID = 'invalid-id';
    await supertest(server)
      .get(`/api/v0/post/postID/${invalidPostID}`)
      .set('Authorization', `Bearer ${lucaToken}`)
      .expect(400);
  });

  // Test for retrieval attempt with non-existent post ID
  test('Get post with NON-EXISTENT POST ID', async () => {
    const nonExistentPostID = 'b1239ef4-971b-4e60-a692-a3af3365ba99';
    await supertest(server)
      .get(`/api/v0/post/postID/${nonExistentPostID}`)
      .set('Authorization', `Bearer ${lucaToken}`)
      .expect(400);
  });

  // Test for error during image link retrieval
  test('Get post with ERROR IN IMAGE LINK RETRIEVAL', async () => {
    jest.spyOn(S3Service.prototype, 'getFileLink')
      .mockResolvedValue(undefined); // Simulate S3 failure by returning undefined

    await supertest(server)
      .get(`/api/v0/post/postID/${validPostID}`)
      .set('Authorization', `Bearer ${lucaToken}`)
      .expect(400);
  });
});

// post/delete error testing suite
describe('Error Test Suite: Verify error handling of post/delete', () => {

  const validLucaPostID = 'a5059ef4-971b-4e60-a692-a3af3365ba85';
  const validKeatonpostID = 'a9359ef4-971b-4e60-a692-a3af3365ba85'

  test('Delete post with VALID POST ID', async () => {
    const response = await supertest(server)
      .delete('/api/v0/post/delete')
      .set('Authorization', `Bearer ${lucaToken}`)
      .query({ postID: validLucaPostID })
      .expect(200);
    expect(response.body).toBeTruthy();
  });

  // Test for deletion attempt with invalid post ID format
  test('Delete post with INVALID POST ID FORMAT', async () => {
    const invalidPostID = 'invalid-id';
    await supertest(server)
      .delete('/api/v0/post/delete')
      .set('Authorization', `Bearer ${lucaToken}`)
      .query({ postID: invalidPostID })
      .expect(400);
  });

  // Test for deletion attempt with non-existent post ID
  test('Delete post with NON-EXISTENT POST ID', async () => {
    const nonExistentPostID = 'b1239ef4-971b-4e60-a692-a3af3365ba99';
    await supertest(server)
      .delete('/api/v0/post/delete')
      .set('Authorization', `Bearer ${lucaToken}`)
      .query({ postID: nonExistentPostID })
      .expect(400);
  });

  // Test for missing post ID
  test('Delete post with MISSING POST ID', async () => {
    await supertest(server)
      .delete('/api/v0/post/delete')
      .set('Authorization', `Bearer ${lucaToken}`)
      .expect(400);
  });

  // Test for user deleting post that isn't theirs
  test('Delete post with UNAUTHORIZED USER', async () => {
    await supertest(server)
      .delete('/api/v0/post/delete')
      .set('Authorization', `Bearer ${lucaToken}`)
      .query({ postID: validKeatonpostID })
      .expect(400);
  });
});

// post/all/{UUID} error testing suite
describe('Test Suite: Verify behavior of /all/{userID} endpoint', () => {
  // Test for successful retrieval of posts for a valid user ID
  test('Get all posts for VALID USER ID', async () => {
    const validUserID = 'a3059ef4-971b-4e60-a692-a3af3365ba85';
    const response = await supertest(server)
      .get(`/api/v0/post/all/${validUserID}`)
      .set('Authorization', `Bearer ${lucaToken}`)
      .expect(200);

    expect(response.body[0]).toHaveProperty('data');
    expect(response.body[0].data).toHaveProperty('image');
  });

  // Test for retrieval attempt with invalid user ID format
  test('Get all posts with INVALID USER ID FORMAT', async () => {
    const invalidUserID = 'invalid-id';
    await supertest(server)
      .get(`/api/v0/post/all/${invalidUserID}`)
      .set('Authorization', `Bearer ${lucaToken}`)
      .expect(500);
  });

});

// post/edit/{PostID} error testing suite
describe('Error Test Suite: Verify error handling of post/edit', () => {
  
    const validPostID = 'a5059ef4-971b-4e60-a692-a3af3365ba85';
  
    // Test for edit attempt with invalid post ID format
    test('Edit post with INVALID POST ID FORMAT', async () => {
      const invalidPostID = 'invalid-id';
      await supertest(server)
        .put(`/api/v0/post/edit/${invalidPostID}`)
        .set('Authorization', `Bearer ${lucaToken}`)
        .query({ rating: 2, caption: 'I hate Big Macs!' })
        .expect(400);
    });
  
    // Test for edit attempt with non-existent post ID
    test('Edit post with NON-EXISTENT POST ID', async () => {
      const nonExistentPostID = 'b1239ef4-971b-4e60-a692-a3af3365ba99';
      await supertest(server)
        .put(`/api/v0/post/edit/${nonExistentPostID}`)
        .set('Authorization', `Bearer ${lucaToken}`)
        .query({ rating: 2, caption: 'I hate Big Macs!' })
        .expect(400);
    });
  
    // Test for missing post ID
    test('Edit post with MISSING POST ID', async () => {
      await supertest(server)
        .put('/api/v0/post/edit/')
        .set('Authorization', `Bearer ${lucaToken}`)
        .query({ rating: 2, caption: 'I hate Big Macs!' })
        .expect(404);
    });
  
    // Test for edit attempt with invalid rating
    test('Edit post with INVALID RATING', async () => {
      await supertest(server)
        .put(`/api/v0/post/edit/${validPostID}`)
        .set('Authorization', `Bearer ${lucaToken}`)
        .query({ rating: 6, caption: 'I hate Big Macs!' })
        .expect(400);
    });

    // Test for edit attempt with invalid caption
    test('Edit post with INVALID CAPTION', async () => {
      await supertest(server)
        .put(`/api/v0/post/edit/${validPostID}`)
        .set('Authorization', `Bearer ${lucaToken}`)
        .query({ rating: 2, caption: 6 })
        .expect(400);
    });
  });
