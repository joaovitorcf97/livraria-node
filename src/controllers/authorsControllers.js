import authors from "../models/Author.js";

class AuthorsController {
  static getAllAuthors = (request, response) => {
    authors.find((error, authors) => {
      response.status(200).json(authors);
    });
  };

  static getAuthor = (request, response) => {
    const id = request.params.id;

    authors.findById(id, (error, author) => {
      if (error) {
        response.status(400).send({ message: `${error.message}.` });
      } else {
        response.status(200).send(author);
      }
    });

  };

  static createAuthor = (request, response) => {
    const author = new authors(request.body);

    author.save((error) => {
      if (error) {
        response.status(500).send({ message: `${error.message} - falha ao cadastrar autor.` });
      } else {
        response.status(201).send(author.toJSON());
      }
    });
  };

  static updateAuthor = (request, response) => {
    const id = request.params.id;

    authors.findByIdAndUpdate(id, { $set: request.body }, (error) => {
      if (!error) {
        response.status(200).send({ message: 'Autor atualizado com sucesso.' });
      } else {
        response.status(500).send({ message: error.message });
      }
    });
  };

  static deleteAuthor = (request, response) => {
    const id = request.params.id;

    authors.findByIdAndDelete(id, (error) => {
      if (!error) {
        response.status(200).send({ message: 'Autor removido com sucesso.' });
      } else {
        response.status(500).send({ message: error.message });
      }
    });
  };
}

export default AuthorsController;