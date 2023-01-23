import books from "../models/Book.js";

class BookController {
  static getAllBooks = (request, response) => {
    books.find()
      .populate('author')
      .exec((error, books) => {
        response.status(200).json(books);
      });
  };

  static getBook = (request, response) => {
    const id = request.params.id;

    books.findById(id)
      .populate('author', 'name')
      .exec((error, book) => {
        if (error) {
          response.status(400).send({ message: `${error.message}.` });
        } else {
          response.status(200).send(book);
        }
      });

  };

  static createBook = (request, response) => {
    const book = new books(request.body);

    book.save((error) => {
      if (error) {
        response.status(500).send({ message: `${error.message} - falha ao cadastrar livro.` });
      } else {
        response.status(201).send(book.toJSON());
      }
    });
  };

  static updateBook = (request, response) => {
    const id = request.params.id;

    books.findByIdAndUpdate(id, { $set: request.body }, (error) => {
      if (!error) {
        response.status(200).send({ message: 'Livro atualizado com sucesso.' });
      } else {
        response.status(500).send({ message: error.message });
      }
    });
  };

  static deleteBook = (request, response) => {
    const id = request.params.id;

    books.findByIdAndDelete(id, (error) => {
      if (!error) {
        response.status(200).send({ message: 'Livro removido com sucesso.' });
      } else {
        response.status(500).send({ message: error.message });
      }
    });
  };

  static getBookByPublishing = (request, response) => {
    const publishing = request.query.publishing;

    books.find({ 'editora': publishing }, {}, (error, books) => {
      response.status(200).send(books);
    });
  };
}

export default BookController;