// Import dependencies
import supertest from 'supertest';
import * as http from 'http';
import app from '../../src/app'; // Adjust path as needed to your Express app

let server: http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>;

beforeAll((done:any) => {
  server = http.createServer(app);
  server.listen(done);
});

afterAll((done:any) => {
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

let postID = '';
// AN IMAGE PATH NEEDS TO BE ADDED TO THIS 
// this and the delete test will fail until an image path is added
describe('Testing post/create endpoint', () => {
  it('should return something ', async () => {
    const res = await supertest(server)
    .post('/api/v0/post/create')
    .send(JSON.stringify(testPostData))
    .expect(201)
    postID = res.body;
    expect(postID).toBeDefined();
    expect(typeof postID).toBe('string');
  });
});

describe('Testing post/delete endpoint', () => {
  it('should return something ', async () => {
    return await supertest(server)
    .delete('/api/v0/post/delete')
    .send({postID})
    .expect(200)
  });
});

describe('Testing post/all endpoint', () => {
  it('should return something ', async () => {
    return await supertest(server)
    .get('/api/v0/post/all')
    .expect(200)
  });
});

describe('Testing post/postID/{ID} endpoint', () => {
  it('should return something ', async () => {
    return await supertest(server)
    .get('/api/v0/post/a5059ef4-971b-4e60-a692-a3af3365ba85')
    .expect(200)
  });
});