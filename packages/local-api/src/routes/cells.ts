import express from 'express';
import fs from 'fs/promises';
import path from 'path';

interface Cell {
  id: string;
  content: string;
  type: 'text' | 'code';
}
interface LocalApiError {
  code: string;
}

export const createCellsRouter = (filename: string, dir: string) => {
  const router = express.Router();
  router.use(express.json());

  const fullPath = path.join(dir, filename);
  router.get('/cells', async (req, res) => {
    try {
      // read the file
      const result = await fs.readFile(fullPath, { encoding: 'utf8' });
      // parse the file of cells out of it
      // send list of cells back to browser
      res.send(JSON.parse(result));
    } catch (err) {
      const isLocalApiError = (err: any): err is LocalApiError => {
        return typeof err.code === 'string';
      };
      if (isLocalApiError(err)) {
        if (err.code === 'ENOENT') {
          // add code to create a file if it doesn't exist
          await fs.writeFile(fullPath, '[]', 'utf-8');
          res.send([]);
        }
      } else {
        throw err;
      }
    }
  });
  router.post('/cells', async (req, res) => {
    // take the list of cells fro the request obj
    // serialize them
    const { cells }: { cells: Cell[] } = req.body;
    // write the cells intp the file
    await fs.writeFile(fullPath, JSON.stringify(cells), 'utf-8');

    res.send({ status: 'ok' });
  });
  return router;
};
