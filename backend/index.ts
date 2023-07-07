import express from 'express';
import { connection } from './config/db';
import cookieParser from 'cookie-parser';

const app = express();
const port = process.env.PORT || 8000;

app.use(cookieParser());

import { userRouter } from './routes/userRouter';
import { bookRouter } from './routes/bookRouter';

app.use(express.json());

app.use('/', userRouter);
app.use('/', bookRouter);


app.listen(port, async () => {
  try {
    await connection;
    console.log('Connected to MongoDB');
  } catch (error) {
    console.log({ err: error.message });
  }
  console.log(`Server is running on port ${port}`);
});
