import BookService from "../services/livro.service.js";

async function createBook(req, res, next) {
  try {
    let livro = req.body;

    if (!livro.nome || !livro.valor || !livro.estoque || !livro.authorId) {
      throw new Error(
        "Os campos nome, valor, estoque e authorId são obrigatórios."
      );
    }
    livro = await BookService.createBook(livro);
    res.send(livro);
    logger.info(`POST /livro ${JSON.stringify(livro)}`);
  } catch (err) {
    next(err);
  }
}

async function getBooks(req, res, next) {
  try {
    res.send(await BookService.getBooks(req.query.authorId));
    logger.info(`GET /livro`);
  } catch (err) {
    next(err);
  }
}

async function getBook(req, res, next) {
  try {
    res.send(await BookService.getBook(req.params.id));
    logger.info(`GET /livro/:id`);
  } catch (err) {
    next(err);
  }
}

async function deleteBook(req, res, next) {
  try {
    await BookService.deleteBook(req.params.id);
    res.end();
    logger.info(`DELETE /livro/:id`);
  } catch (err) {
    next(err);
  }
}

async function updateBook(req, res, next) {
  try {
    let livro = req.body;
    if (!livro.livroId || !livro.nome || !livro.valor || !livro.estoque || !livro.authorId) {
      throw new Error(
        "Os campos livroId, nome, valor, estoque e authorId são obrigatórios."
      );
    }

    livro = await BookService.updateBook(livro);
    res.send(livro);
    logger.info(`PUT /livro ${JSON.stringify(livro)}`);
  } catch (err) {
    next(err);
  }
}


async function createBookInfo(req, res, next) {
  try {
    let livroInfo = req.body;
    await BookService.createBookInfo(livroInfo);
    res.end();
    logger.info(`POST /livro/info ${JSON.stringify(livroInfo)}`);
  } catch (err) {
    throw err;
  }
}

async function getBookInfos(req, res, next) {
  try {
    const livroInfo = await BookService.getBookInfos();
    res.send(livroInfo);
    logger.info("GET /livro/info");
  } catch (err) {
    throw err;
  }
}

async function createReview(req, res, next) {
  try {
    const livroInfo = req.body;

    if (!livroInfo.id || !livroInfo.comments) {
      throw new Error("Os campos id e comments são obrigatórios");
    }

    const result = await BookService.createReview(livroInfo);
    res.send(result);
    logger.info("POST /livro/info");
  } catch (err) {
    throw err;
  }
}

export default {
  createBook,
  getBooks,
  getBook,
  deleteBook,
  updateBook,
  createBookInfo,
  getBookInfos,
  createReview,
};
