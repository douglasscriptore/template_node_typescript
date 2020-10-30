import 'reflect-metadata';
import 'dotenv/config';

import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { errors } from 'celebrate';
import 'express-async-errors';

import routes from './routes';
import AppError from '../../errors/AppError';

/**
 * initialize Express
 */
const app = express();

/**
 * Cors Policy
 */
app.use(cors());

/**
 * indicate express to accept json files
 */
app.use(express.json());

/**
 * initilize route file
 */
app.use(routes);

/**
 * initilize handle errors
 */
app.use(errors());
app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response
      .status(err.statusCode)
      .json({ status: 'error', message: err.message });
  }

  console.error(err);

  return response
    .status(500)
    .json({ status: 'error', message: 'Internal Server Error' });
});

/**
 * RUN SERVER
 */
app.listen(3333, () => {
  console.log('Server started on port 3333');
});
