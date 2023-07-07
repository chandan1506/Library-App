import fs from 'fs';
import { Request, Response, NextFunction } from 'express';

const logger = (req: Request, res: Response, next: NextFunction) => {
  fs.appendFileSync('./log.txt', `URL = ${req.url}, HTTP-Method = ${req.method}\n`);
  next();
};

export { logger };
