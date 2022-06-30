import AuthorRepository from "../repositories/autor.repository.js";
import BookRepository from "../repositories/livro.repository.js";

async function createAuthor(author) {
  return await AuthorRepository.insertAuthor(author);
}

async function getAuthors() {
  return await AuthorRepository.getAuthors();
}

async function getAuthor(id) {
  return await AuthorRepository.getAuthor(id);
}

async function deleteAuthor(id) {
  const livro = BookRepository.getBookByAuthorId(id);
  if (livro) {
    throw new Error("Existem livros cadastrados para este autor.");
  } else {
    AuthorRepository.deleteAuthor(id);
  }
}

async function updateAuthor(author) {
  return AuthorRepository.updateAuthor(author);
}

export default {
  createAuthor,
  getAuthors,
  getAuthor,
  deleteAuthor,
  updateAuthor,
};
