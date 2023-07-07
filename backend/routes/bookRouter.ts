import express from 'express';
import { authentication } from '../middleware/authentication';
import {
  getBooks,
  createBookCreator,
  createBookViewer,
  getAllBooks,
} from '../controller/book.controller';
import { authorization } from '../middleware/authorization';
import { logger } from '../middleware/logger';

const bookRouter = express.Router();

// Create book (for users with role "CREATOR")
bookRouter.post('/books', authentication, authorization(['CREATOR']),logger, createBookCreator);

// Create book (for users with role "VIEWER")
bookRouter.post('/view', authentication, authorization(['VIEWER']),logger, createBookViewer);

// Get books created by a user
bookRouter.get('/books/:id', authentication, authorization(['VIEWER']), getBooks);

// Get all books
bookRouter.get('/books', authentication, authorization(['VIEW_ALL']),logger, getAllBooks);

export { bookRouter };