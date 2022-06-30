import Customer from "../models/cliente.model.js";

async function insertCustomer(customer) {
  try {
    return await Customer.create(customer);
  } catch (err) {
    throw err;
  }
}

async function getCustomers() {
  try {
    return await Customer.findAll();
  } catch (err) {
    throw err;
  }
}

async function getCustomer(id) {
  try {
    return await Customer.findByPk(id);
  } catch (err) {
    throw err;
  }
}

async function updateCustomer(customer) {
  try {
    await Customer.update(customer, {
      where: {
        clienteId: customer.clienteId,
      },
    });
    return await getCustomers(customer.clienteId);
  } catch (err) {
    throw err;
  }
}

async function deleteCustomer(id) {
  try {
    await Customer.destroy({
      where: {
        clienteId: id,
      },
    });
  } catch (err) {
    throw err;
  }
}

export default {
  insertCustomer,
  getCustomers,
  getCustomer,
  updateCustomer,
  deleteCustomer,
};
