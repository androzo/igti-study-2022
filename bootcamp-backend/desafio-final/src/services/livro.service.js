import BookRepository from "../repositories/livro.repository.js";
import AuthorRepository from "../repositories/autor.repository.js";

async function createBook(book) {
  if (await AuthorRepository.getAuthor(book.authorId)) {
    return await BookRepository.insertBook(book);
  }
  throw new Error("Autor inexistente na base");
}

async function getBooks(ownerId) {
  if (ownerId) {
    return await BookRepository.getBookByAuthorId(ownerId);
  } else {
    return await BookRepository.getBooks();
  }
}

async function getBook(id) {
  return await BookRepository.getBook(id);
}

async function deleteBook(id) {
  BookRepository.deleteBook(id);
}

async function updateBook(book) {
  if (await AuthorRepository.getAuthor(book.authorId)) {
    return BookRepository.updateBook(book);
  }
  throw new Error("Autor inexistente na base");
}

async function createBookInfo(bookInfo) {
  await BookRepository.createBook(bookInfo);
}

async function getBooksInfo() {
  return await BookRepository.getBooksInfo();
}

async function createReview(book) {
  return await BookRepository.createReview(book);
}

export default {
  createBook,
  getBooks,
  getBook,
  deleteBook,
  updateBook,
  createBookInfo,
  getBooksInfo,
  createReview,
};
