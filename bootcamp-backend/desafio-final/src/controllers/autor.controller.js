import AuthorService from "../services/autor.service.js";

async function createAuthor(req, res, next) {
  try {
    let autor = req.body;

    if (!autor.nome || !autor.telefone || !autor.email) {
      throw new Error("Os campos nome, email e telefone são obrigatórios.");
    }
    autor = await AuthorService.createAuthor(autor);
    res.send(autor);
    logger.info(`POST /autor ${JSON.stringify(autor)}`);
  } catch (err) {
    next(err);
  }
}

async function getAuthors(req, res, next) {
  try {
    res.send(await AuthorService.getAuthors());
    logger.info(`GET /autor`);
  } catch (err) {
    next(err);
  }
}

async function getAuthor(req, res, next) {
  try {
    res.send(await AuthorService.getAuthor(req.params.id));
    logger.info(`GET /autor/:id`);
  } catch (err) {
    next(err);
  }
}

async function deleteAuthor(req, res, next) {
  try {
    await AuthorService.deleteAuthor(req.params.id);
    res.end();
    logger.info(`DELETE /autor/:id`);
  } catch (err) {
    next(err);
  }
}

async function updateAuthor(req, res, next) {
  try {
    let autor = req.body;
    if (!autor.autorId || !autor.nome || !autor.telefone || !autor.email) {
      throw new Error(
        "Os campos autorId, nome, email e telefone são obrigatórios."
      );
    }

    autor = await AuthorService.updateAuthor(autor);
    res.send(autor);
    logger.info(`PUT /autor ${JSON.stringify(autor)}`);
  } catch (err) {
    next(err);
  }
}

export default {
  createAuthor,
  getAuthors,
  getAuthor,
  deleteAuthor,
  updateAuthor,
};
