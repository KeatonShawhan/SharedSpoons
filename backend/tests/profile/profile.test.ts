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

const testPostData = {
  user: 'a3059ef4-971b-4e60-a692-a3af3365ba85',
  data: {
    image: '',
    rating: 5,
    adds: 0,
    restaurant: 'McDonalds',
    dish: 'Big Mac',
    time: '',
    caption: 'I love Big Macs'
  }
}

// AN IMAGE PATH NEEDS TO BE ADDED TO THIS 
// this and the delete test will fail until an image path is added
test('Testing post/create endpoint', async () => {
  return await supertest(server)
  .post('/api/v0/post/create')
  .set('Content-Type', 'multipart/form-data')
  .field('post', JSON.stringify(testPostData))
  .attach('file', '/usr/src/app/tests/testcat.jpg')
  .expect(201)
});

test('Testing post/delete endpoint', async () => {
  return await supertest(server)
  .delete('/api/v0/post/delete')
  .query({postID : 'a9359ef4-971b-4e60-a692-a3af3365ba85'})
  .expect(200)
});

test('Testing post/all endpoint', async () => {
  return await supertest(server)
  .get('/api/v0/post/all')
  .expect(200)
});

test('Testing post/postID/{ID} endpoint', async () => {
  return await supertest(server)
  .get('/api/v0/post/postID/a5059ef4-971b-4e60-a692-a3af3365ba85')
  .expect(200)
});