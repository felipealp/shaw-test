import request from 'supertest';
import express from 'express';
import routes from '../../src/start/routes';

const app = express();
app.use(express.json());
app.use('/', routes);

describe('Routes', () => {
  it('should upload a file', async () => {
    const response = await request(app)
      .post('/files')
      .attach('file', Buffer.from('test content'), 'test.csv');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'The file was uploaded successfully', data: [] });
  });

  it('should find users', async () => {
    const response = await request(app).get('/users');

    expect(response.status).toBe(200);
  });
});