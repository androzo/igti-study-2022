import CustomerService from "../services/cliente.service.js";

async function createCustomer(req, res, next) {
  try {
    let cliente = req.body;

    if (!cliente.nome || !cliente.telefone || !cliente.email) {
      throw new Error("Os campos nome, email e telefone são obrigatórios.");
    }
    cliente = await CustomerService.createCustomer(cliente);
    res.send(cliente);
    logger.info(`POST /cliente ${JSON.stringify(cliente)}`);
  } catch (err) {
    next(err);
  }
}

async function getCustomers(req, res, next) {
  try {
    res.send(await CustomerService.getCustomers());
    logger.info(`GET /cliente`);
  } catch (err) {
    next(err);
  }
}

async function getCustomer(req, res, next) {
  try {
    res.send(await CustomerService.getCustomer(req.params.id));
    logger.info(`GET /cliente/:id`);
  } catch (err) {
    next(err);
  }
}

async function deleteCustomer(req, res, next) {
  try {
    await CustomerService.deleteCustomer(req.params.id);
    res.end();
    logger.info(`DELETE /cliente/:id`);
  } catch (err) {
    next(err);
  }
}

async function updateCustomer(req, res, next) {
  try {
    let cliente = req.body;
    if (!cliente.clienteId || !cliente.nome || !cliente.telefone || !cliente.email) {
      throw new Error(
        "Os campos clienteId, nome, email e telefone são obrigatórios."
      );
    }

    cliente = await CustomerService.updateCustomer(cliente);
    res.send(cliente);
    logger.info(`PUT /cliente ${JSON.stringify(cliente)}`);
  } catch (err) {
    next(err);
  }
}

export default {
  createCustomer,
  getCustomers,
  getCustomer,
  deleteCustomer,
  updateCustomer,
};
