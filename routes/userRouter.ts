import express from 'express';
import { register, login } from '../controller/user.controller';
import { logger } from '../middleware/logger';

const userRouter = express.Router();

// Register user
userRouter.post('/register',logger, register);

// User login
userRouter.post('/login',logger, login);

export { userRouter };