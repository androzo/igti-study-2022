import SaleRepository from "../repositories/sale.repository.js";
import ClientRepository from "../repositories/client.repository.js";
import ProductRepository from "../repositories/product.repository.js";

async function createSale(sale) {
  let errors = [];
  if (!(await ClientRepository.getClient(sale.client_id))) {
    errors.push("O client_id informado não existe");
  }
  if (!(await ProductRepository.getProduct(sale.product_id))) {
    errors.push("O product_id informado não existe");
  }
  if (errors) {
    throw errors;
  }

  return await SaleRepository.insertSale(sale);
}

async function getSales() {
  return await SaleRepository.getSales();
}

async function getSale(id) {
  return await SaleRepository.getSale(id);
}

async function deleteSale(id) {
  SaleRepository.deleteSale(id);
}

async function updateSale(sale) {
  if (
    (await ClientRepository.getClient(sale.client_id)) &&
    (await ProductRepository.getProduct(sale.product_id)) &&
    (await getSale(sale.sale_id))
  ) {
    return SaleRepository.updateSale(sale);
  }
  throw new Error("id, client_id ou product_id não existem");
}

export default {
  createSale,
  getSales,
  getSale,
  deleteSale,
  updateSale,
};
