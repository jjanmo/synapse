import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { path: filePath } = req.query;

  console.log('filePath', filePath);

  if (!filePath || !Array.isArray(filePath)) {
    return res.status(400).json({ error: 'Invalid path' });
  }

  try {
    const fullPath = path.join(process.cwd(), 'content', ...filePath);
    const content = fs.readFileSync(fullPath, 'utf8');

    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.status(200).send(content);
  } catch (error) {
    console.error('파일 읽기 실패:', error);
    res.status(404).json({ error: 'File not found' });
  }
}
