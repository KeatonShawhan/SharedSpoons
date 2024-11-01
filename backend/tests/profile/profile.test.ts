import supertest from 'supertest';
import * as http from 'http';
import app from '../../src/app'; // Adjust path as needed to your Express app
import * as db from '../db';
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

describe('Error Test Suite: Verify error handling of all endpts', () => {
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