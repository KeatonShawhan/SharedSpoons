import supertest from 'supertest';
import * as http from 'http';
import app from '../../src/app'; // Adjust path as needed to your Express app
import * as db from '../db';
import { S3Service } from '../../src/s3/service';
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

const validTestPostData = {
  user: 'a3059ef4-971b-4e60-a692-a3af3365ba85',
  data: {
    rating: 5,
    restaurant: 'McDonalds',
    dish: 'Big Mac',
    caption: 'I love Big Macs'
  }
}

const invalidUserPostData = {
  user: 'bbbbbbbb-971b-4e60-a692-a3af3365ba85',
  data: {
    rating: 1,
    restaurant: 'Banana Stand',
    dish: 'Banana',
    caption: 'I love bananas'
  }
}

const invalidDataPostData = {
  user: 'a3059ef4-971b-4e60-a692-a3af3365ba85',
  data: {
    gobbledegook: 5,
    restaurant: 'McDonalds',
    caption: 'This should not work'
  }
}

// Basic Test Suite First and foremost
describe('Basic Test Suite: Verify Basic functionality of all endpts', () => {
  test('Testing post/create endpoint', async () => {
    return await supertest(server)
    .post('/api/v0/post/create')
    .set('Content-Type', 'multipart/form-data')
    .field('post', JSON.stringify(validTestPostData))
    .attach('file', '/usr/src/app/tests/testcat.jpg')
    .expect(201)
  });

  test('Testing post/delete endpoint', async () => {
    return await supertest(server)
    .delete('/api/v0/post/delete')
    .query({postID : 'a9359ef4-971b-4e60-a692-a3af3365ba85'})
    .expect(200)
  });

  test('Testing post/all/{UUID} endpoint', async () => {
    return await supertest(server)
    .get('/api/v0/post/all/a3059ef4-971b-4e60-a692-a3af3365ba85')
    .expect(200)
  });

  test('Testing post/postID/{ID} endpoint', async () => {
    return await supertest(server)
    .get('/api/v0/post/postID/a5059ef4-971b-4e60-a692-a3af3365ba85')
    .expect(200)
  });
});

// post/create error testing suite
describe('Error Test Suite: Verify error handling of post/create', () => {
  test('Testing post/create endpoint with INVALID USER ID', async () => {
    return await supertest(server)
    .post('/api/v0/post/create')
    .set('Content-Type', 'multipart/form-data')
    .field('post', JSON.stringify(invalidUserPostData))
    .attach('file', '/usr/src/app/tests/testcat.jpg')
    .expect(400)
  });
  test('Testing post/create endpoint with NON-JSON POST DATA', async () => {
    return await supertest(server)
    .post('/api/v0/post/create')
    .set('Content-Type', 'multipart/form-data')
    .field('post', 'abcadaba')
    .attach('file', '/usr/src/app/tests/testcat.jpg')
    .expect(500)
  });
  test('Testing post/create endpoint with INVALID POST DATA', async () => {
    return await supertest(server)
    .post('/api/v0/post/create')
    .set('Content-Type', 'multipart/form-data')
    .field('post', JSON.stringify(invalidDataPostData))
    .attach('file', '/usr/src/app/tests/testcat.jpg')
    .expect(400)
  });
  test('Testing post/create endpoint with INVALID FILE', async () => {
    return await supertest(server)
    .post('/api/v0/post/create')
    .set('Content-Type', 'multipart/form-data')
    .field('post', JSON.stringify(validTestPostData))
    .attach('file', '/usr/src/app/tests/testcat.txt')
    .expect(400)
  });

});

// post/get error testing suite
describe('Error Test Suite: Verify error handling of post/get/{PostID}', () => {

  const validPostID = 'a5059ef4-971b-4e60-a692-a3af3365ba85';

  // Test for a successful post retrieval
  test('Get post with VALID POST ID', async () => {
    const response = await supertest(server)
      .get(`/api/v0/post/postID/${validPostID}`)
      .expect(200);

    expect(response.body).toBeDefined();
    expect(response.body.id).toBe(validPostID);
    expect(response.body.data).toHaveProperty('image');
  });

  // Test for retrieval attempt with invalid post ID format
  test('Get post with INVALID POST ID FORMAT', async () => {
    const invalidPostID = 'invalid-id';
    const response = await supertest(server)
      .get(`/api/v0/post/postID/${invalidPostID}`)
      .expect(400);
  });

  // Test for retrieval attempt with non-existent post ID
  test('Get post with NON-EXISTENT POST ID', async () => {
    const nonExistentPostID = 'b1239ef4-971b-4e60-a692-a3af3365ba99';
    const response = await supertest(server)
      .get(`/api/v0/post/postID/${nonExistentPostID}`)
      .expect(400);
  });

  // Test for error during image link retrieval
  test('Get post with ERROR IN IMAGE LINK RETRIEVAL', async () => {
    const mockGetFileLink = jest.spyOn(S3Service.prototype, 'getFileLink')
      .mockResolvedValue(undefined); // Simulate S3 failure by returning undefined

    const response = await supertest(server)
      .get(`/api/v0/post/postID/${validPostID}`)
      .expect(400);
  });
});

// post/delete error testing suite
describe('Error Test Suite: Verify error handling of post/delete', () => {

  const validPostID = 'a5059ef4-971b-4e60-a692-a3af3365ba85';

  test('Delete post with VALID POST ID', async () => {
    const response = await supertest(server)
      .delete('/api/v0/post/delete')
      .query({ postID: validPostID })
      .expect(200);
    expect(response.body).toBeTruthy();
  });

  // Test for deletion attempt with invalid post ID format
  test('Delete post with INVALID POST ID FORMAT', async () => {
    const invalidPostID = 'invalid-id';
    const response = await supertest(server)
      .delete('/api/v0/post/delete')
      .query({ postID: invalidPostID })
      .expect(400);
  });

  // Test for deletion attempt with non-existent post ID
  test('Delete post with NON-EXISTENT POST ID', async () => {
    const nonExistentPostID = 'b1239ef4-971b-4e60-a692-a3af3365ba99';
    const response = await supertest(server)
      .delete('/api/v0/post/delete')
      .query({ postID: nonExistentPostID })
      .expect(400);
  });

  // Test for missing post ID
  test('Delete post with MISSING POST ID', async () => {
    const response = await supertest(server)
      .delete('/api/v0/post/delete')
      .expect(400);
  });
});