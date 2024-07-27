import request from 'supertest';
import express, { Request, Response, NextFunction } from 'express';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { setCSVData, uploadFile, findData } from '../../src/app/controllers/Controller';

const app = express();
const upload = multer({ dest: 'uploads/' });

app.post('/upload', upload.single('file'), (req: Request, res: Response, next: NextFunction) => {
  uploadFile(req, res, next);
});
app.get('/data', findData);

describe('uploadFile', () => {
  const CSVData = [
    { name: 'John', age: '30' },
    { name: 'Jane', age: '25' },
    { name: 'Doe', age: '40' }
  ];

  beforeAll(() => {
    setCSVData(CSVData);
  
    const uploadsDir = path.resolve(__dirname, '../../src/app/uploads');
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }
  });

  it('should return all data when query is empty', async () => {
    const response = await request(app).get('/data');

    expect(response.status).toBe(200);
    expect(response.body.data).toEqual(CSVData);
  });

  it('should return filtered data when query is provided', async () => {
    const response = await request(app).get('/data?q=jane');

    expect(response.status).toBe(200);
    expect(response.body.data).toEqual([{ name: 'Jane', age: '25' }]);
  });

  it('should return empty array when query does not match', async () => {
    const response = await request(app).get('/data?q=nonexistent');

    expect(response.status).toBe(200);
    expect(response.body.data).toEqual([]);
  });

  it('should return 400 if no file is provided', async () => {
    const response = await request(app)
      .post('/upload');

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('No file provided');
  });

  it('should upload a file and parse CSV data', async () => {
    const response = await request(app)
      .post('/upload')
      .attach('file', Buffer.from('name,age\nJohn,30\nJane,25'), 'test.csv');

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("The file was uploaded successfully");
    expect(response.body.data).toEqual([
      { name: 'John', age: '30' },
      { name: 'Jane', age: '25' }
    ]);
  });
});