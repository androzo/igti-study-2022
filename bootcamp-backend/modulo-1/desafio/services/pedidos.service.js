import OrderRepository from "../repositories/pedidos.repository.js";

async function createOrder(order) {
  return await OrderRepository.insertOrder(order);
}

async function getOrders() {
  return await OrderRepository.getOrders();
}

async function getOrder(id) {
  return await OrderRepository.getOrder(id);
}

async function deleteOrder(id) {
  return await OrderRepository.deleteOrder(id);
}

async function updateOrder(order) {
  return await OrderRepository.updateOrder(order);
}

async function updateOrderStatus(order) {
  const data = await OrderRepository.getOrder(order.id);
  data.entregue = order.entregue;
  return await OrderRepository.updateOrderStatus(data);
}

async function getOrdersSumByName(name) {
  return await OrderRepository.getOrdersSumByName(name);
}
async function getOrdersSumByProduct(name) {
  return await OrderRepository.getOrdersSumByProduct(name);
}

export default {
  createOrder,
  getOrders,
  getOrder,
  deleteOrder,
  updateOrder,
  updateOrderStatus,
  getOrdersSumByName,
  getOrdersSumByProduct,
};
