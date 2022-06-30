import SaleService from "../services/venda.service.js";

async function createSale(req, res, next) {
  try {
    let venda = req.body;

    if (!venda.descricao || !venda.valor || !venda.livroId) {
      throw new Error(
        "Os campos descricao, valor e livroId são obrigatórios."
      );
    }
    venda = await SaleService.createSale(venda);
    res.send(venda);
    logger.info(`POST /venda ${JSON.stringify(venda)}`);
  } catch (err) {
    next(err);
  }
}

async function getSales(req, res, next) {
  try {
    res.send(await SaleService.getSales(req.query.proprietario_id));
    logger.info(`GET /venda`);
  } catch (err) {
    next(err);
  }
}

async function getSale(req, res, next) {
  try {
    res.send(await SaleService.getSale(req.params.id));
    logger.info(`GET /venda/:id`);
  } catch (err) {
    next(err);
  }
}

async function deleteSale(req, res, next) {
  try {
    await SaleService.deleteSale(req.params.id);
    res.end();
    logger.info(`DELETE /venda/:id`);
  } catch (err) {
    next(err);
  }
}

async function updateSale(req, res, next) {
  try {
    let venda = req.body;
    if (
      !venda.vendaId ||
      !venda.descricao ||
      !venda.valor ||
      !venda.livroId
    ) {
      throw new Error(
        "Os campos vendaId, descricao, valor, e livroId são obrigatórios."
      );
    }

    venda = await SaleService.updateSale(venda);
    res.send(venda);
    logger.info(`PUT /venda ${JSON.stringify(venda)}`);
  } catch (err) {
    next(err);
  }
}

export default {
  createSale,
  getSales,
  getSale,
  deleteSale,
  updateSale,
};
