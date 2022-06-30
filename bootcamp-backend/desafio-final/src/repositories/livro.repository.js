import Book from "../models/livro.model.js";
import { ObjectId } from "mongodb/lib/bson.js";
import { getClient } from "../utils/mongo.js";

async function insertBook(book) {
  try {
    return await Book.create(book);
  } catch (err) {
    throw err;
  }
}

async function getBooks() {
  try {
    return await Book.findAll();
  } catch (err) {
    throw err;
  }
}

async function getBook(id) {
  try {
    return await Book.findByPk(id);
  } catch (err) {
    throw err;
  }
}

async function updateBook(book) {
  try {
    await Book.update(book, {
      where: {
        livroId: book.livroId,
      },
    });
    return await getBook(book.livroId);
  } catch (err) {
    throw err;
  }
}

async function deleteBook(id) {
  try {
    await Book.destroy({
      where: {
        livroId: id,
      },
    });
  } catch (err) {
    throw err;
  }
}

async function getBookByOwnerId(id) {
  try {
    return await Book.findAll({
      where: {
        autorId: id,
      },
    });
  } catch (err) {
    throw err;
  }
}

async function createBookInfo(livroInfo) {
  const client = getClient();
  try {
    await client.connect();
    await client.db("local").collection("livroinfo").insertOne(livroInfo);
  } catch (err) {
    throw err;
  } finally {
    await client.close();
  }
}

async function createReview(livro) {
  const client = getClient();
  try {
    await client.connect();
    return await client
      .db("local")
      .collection("livroinfo")
      .updateOne(
        { _id: ObjectId(livro.id) },
        { $push: { avaliacoes: livro.avaliacao } }
      );
  } catch (err) {
    throw err;
  } finally {
    await client.close();
  }
}

async function getBookInfo() {
  const client = getClient();

  try {
    await client.connect();
    const cursor = client.db("local").collection("livroinfo").find({});
    const result = [];
    await cursor.forEach((item) => {
      result.push(item);
    });
    return result;
  } catch (err) {
    throw err;
  } finally {
    await client.close();
  }
}

export default {
  insertBook,
  getBooks,
  getBook,
  updateBook,
  deleteBook,
  getBookByOwnerId,
  createBookInfo,
  getBookInfo,
  createReview
};
