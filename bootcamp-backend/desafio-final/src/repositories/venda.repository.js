import Sale from "../models/venda.model.js";
import Livro from "../models/livro.model.js";
import Customer from "../models/cliente.model.js";

async function insertSale(venda) {
  try {
    return await Sale.create(venda);
  } catch (err) {
    throw err;
  }
}

async function getSales() {
  try {
    return await Sale.findAll();
  } catch (err) {
    throw err;
  }
}

async function getSale(id) {
  try {
    return await Sale.findByPk(id);
  } catch (err) {
    throw err;
  }
}

async function updateSale(venda) {
  try {
    await Sale.update(venda, {
      where: {
        vendaId: venda.vendaId,
      },
    });
    return await getSale(venda.vendaId);
  } catch (err) {
    throw err;
  }
}

async function deleteSale(id) {
  try {
    await Sale.destroy({
      where: {
        vendaId: id,
      },
    });
  } catch (err) {
    throw err;
  }
}

async function getSaleByBookId(id) {
  try {
    return await Sale.findAll({
      include: [
        {
          model: Livro,
          where: {
            livroId: id,
          },
        },
      ],
    });
  } catch (err) {
    throw err;
  }
}

async function getSaleByCustomerId(id) {
  try {
    return await Sale.findAll({
      include: [
        {
          model: Customer,
          where: {
            clienteId: id,
          },
        },
      ],
    });
  } catch (err) {
    throw err;
  }
}

export default {
  insertSale,
  getSales,
  getSale,
  updateSale,
  deleteSale,
  getSaleByCustomerId,
  getSaleByBookId,
};
