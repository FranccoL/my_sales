import 'reflect-metadata';
import 'express-async-errors';
import express from 'express';
import cors from 'cors';

import routes from './routes';
import ErrorHandleMiddleware from '../middlewares/ErrorHandleMiddleware';
import { AppDataSource } from '../typeorm/data-source';

AppDataSource.initialize()
.then(async () => {
const app = express();

app.use(cors());
app.use(express.json());

app.use(routes);
app.use(ErrorHandleMiddleware.haddleError);

console.log('Connected to the database');

app.listen(3333, () => {
  console.log('Server is running on port 3333');
});
})
.catch(error => {
  console.error('Failed to connect to the database', error);
});



