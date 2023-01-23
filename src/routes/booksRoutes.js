import express from 'express';
import BookController from '../controllers/booksControllers.js';

const router = express.Router();

router
  .get('/books', BookController.getAllBooks)
  .get('/books/search', BookController.getBookByPublishing)
  .get('/books/:id', BookController.getBook)
  .post('/books', BookController.createBook)
  .put('/books/:id', BookController.updateBook)
  .delete('/books/:id', BookController.deleteBook);

export default router;