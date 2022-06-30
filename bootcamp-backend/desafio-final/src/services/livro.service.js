import BookRepository from "../repositories/animal.repository.js";
import AuthorRepository from "../repositories/autor.repository";

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

async function createBookInfo(postInfo) {
  await BookRepository.createBook(postInfo);
}

async function getBooksInfo() {
  return await BookRepository.getBooksInfo();
}

async function createReview(post) {
  return await BookRepository.createReview(post);
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
