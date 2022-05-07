import { promises as fs, write } from "fs";
import _ from "lodash";
import { loggers } from "winston";
const { readFile, writeFile } = fs;

global.fileName = "pedidos.json";

const readOrders = async () => JSON.parse(await readFile(global.fileName));
const writeOrders = async (data) =>
  await writeFile(global.fileName, JSON.stringify(data, null, 2));

const getOrders = async () => {
  const data = await readOrders();
  return data.pedidos;
};

async function insertOrder(pedido) {
  const data = await readOrders();

  pedido = {
    id: data.nextId++,
    cliente: pedido.cliente,
    produto: pedido.produto,
    valor: pedido.valor,
    entregue: false,
    timestamp: new Date(),
  };
  data.pedidos.push(pedido);
  await writeOrders(data);
  return pedido;
}

async function getOrder(id) {
  const data = await readOrders();
  const pedido = data.pedidos.find((pedido) => pedido.id == id);
  if (pedido) {
    return pedido;
  }
  throw new Error("Registro não encontrado");
}

async function deleteOrder(id) {
  const data = await readOrders();
  data.pedidos = data.pedidos.filter((pedido) => pedido.id != id);
  await writeOrders(data);
}

async function updateOrder(pedido) {
  const data = await readOrders();
  const index = data.pedidos.findIndex((obj) => obj.id === pedido.id);

  if (index == -1) {
    throw new Error("Registro não encontrado.");
  }

  data.pedidos[index].cliente = pedido.cliente;
  data.pedidos[index].produto = pedido.produto;
  data.pedidos[index].valor = pedido.valor;
  await writeOrders(data);
  return data.pedidos[index];
}

async function updateOrderStatus(pedido) {
  const data = await readOrders();
  const index = data.pedidos.findIndex((obj) => obj.id === pedido.id);

  if (index == -1) {
    throw new Error("Registro não encontrado.");
  }

  data.pedidos[index].entregue = pedido.entregue;
  await writeOrders(data);
  return data.pedidos[index];
}

async function getOrdersSumByName(name) {
  const data = await readOrders();
  const pedidos = data.pedidos.filter(
    (pedido) => pedido.cliente === name && pedido.entregue
  );
  return { name, total: _.sumBy(pedidos, "valor") };
}

async function getOrdersSumByProduct(name) {
  const data = await readOrders();
  const pedidos = data.pedidos.filter(
    (pedido) => pedido.produto === name && pedido.entregue
  );
  return { name, total: _.sumBy(pedidos, "valor") };
}

export default {
  getOrders,
  getOrder,
  insertOrder,
  updateOrder,
  deleteOrder,
  updateOrderStatus,
  getOrdersSumByName,
  getOrdersSumByProduct,
};
