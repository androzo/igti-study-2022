import SaleRepository from "../repositories/venda.repository.js";
import BookRepository from "../repositories/livro.repository.js";
import CustomerRepository from "../repositories/cliente.repository"

async function createSale(venda) {
  if (await BookRepository.getBook(venda.livroId) && await CustomerRepository.getCustomer(venda.clienteId)) {
    return await SaleRepository.insertSale(venda);
  }
  throw new Error("Cliente ou livro inexistentes na base");
}

async function getSales(ownerId) {
  if (ownerId) {
    return await SaleRepository.getSaleByOwnerId(ownerId);
  } else {
    return await SaleRepository.getSales();
  }
}

async function getSale(id) {
  return await SaleRepository.getSale(id);
}

async function deleteSale(id) {
  SaleRepository.deleteSale(id);
}

async function updateSale(venda) {
  if (await BookRepository.getBook(venda.livroId) && await CustomerRepository.getCustomer(venda.clienteId)) {
    return SaleRepository.updateSale(venda);
  }
  throw new Error("Livro ou cliente inexistente na base");
}

export default {
  createSale,
  getSales,
  getSale,
  deleteSale,
  updateSale,
};
