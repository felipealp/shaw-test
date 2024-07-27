import { Request, Response, NextFunction } from 'express';
import fs from 'fs';
import csv from 'csv-parser';
import multer from 'multer';

interface CsvRow {
  [key: string]: string;
}

interface CustomRequest extends Request {
  file?: Express.Multer.File;
}

let csvData: CsvRow[] = [];
const upload = multer({ dest: 'uploads/' });

export const setCSVData = (data: CsvRow[]) => {
  csvData = data;
}

// Upload CSV file
export const uploadFile = async (req: CustomRequest, res: Response, next: NextFunction): Promise<void> => {
  upload.single('file')(req, res, (err: string | null) => {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ message: "No file provided" });
    }

    const results: CsvRow[] = [];
    fs.createReadStream(file.path)
      .pipe(csv())
      .on('data', (data: CsvRow) => results.push(data))
      .on('end', () => {
        setCSVData(results);
        fs.unlinkSync(file.path);
        res.status(200).json({ message: "The file was uploaded successfully", data: csvData });
      });
  });
};

// Find data
export const findData = async (req: Request, res: Response) => {
  const query = typeof req.query.q === 'string' ? req.query.q.toLowerCase() : '';
  if (!query) {
    return res.status(200).json({ data: csvData });
  }

  const filteredData = csvData.filter(row => {
    return Object.values(row).some(value => 
      value.toString().toLowerCase().includes(query)
    );
  });

  res.status(200).json({ data: filteredData });
};