import supertest from 'supertest';
import * as http from 'http';
import app from '../src/app'; // Adjust path as needed to your Express app

let server: http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>;

beforeAll((done:any) => {
  server = http.createServer(app);
  server.listen(done);
});

afterAll((done:any) => {
  server.close(done);
});

describe('Testing Testing', () => {
  it('should return something ', async () => {
    const response = await supertest(server).get('/api/v0/docs/');
    expect(response.status).toBe(200);
  });
});