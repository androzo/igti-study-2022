import CustomerRepository from "../repositories/cliente.repository.js";
import SaleRepository from "../repositories/venda.repository.js";

async function createCustomer(author) {
  return await CustomerRepository.insertCustomer(author);
}

async function getCustomers() {
  return await CustomerRepository.getCustomers();
}

async function getCustomer(id) {
  return await CustomerRepository.getCustomer(id);
}

async function deleteCustomer(id) {
  const animal = SaleRepository.getSaleByCustomerId(id);
  if (animal) {
    throw new Error("Existem vendas cadastrados para este autor.");
  } else {
    CustomerRepository.deleteCustomer(id);
  }
}

async function updateCustomer(author) {
  return CustomerRepository.updateCustomer(author);
}

export default {
  createCustomer,
  getCustomers,
  getCustomer,
  deleteCustomer,
  updateCustomer,
};
