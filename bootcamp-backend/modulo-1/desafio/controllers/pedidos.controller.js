import OrderService from "../services/pedidos.service.js";

async function createOrder(req, res, next) {
  try {
    let order = req.body;

    if (!order.cliente || !order.produto || order.valor == null) {
      throw new Error("Cliente, Produto e Valor são obrigatórios");
    }

    await OrderService.createOrder(order);

    res.send(order);
    logger.info(`POST /pedido - ${JSON.stringify(order)}`);
  } catch (error) {
    next(error);
  }
}

async function getOrders(req, res, next) {
  try {
    res.send(await OrderService.getOrders());
    logger.info("GET /pedidos");
  } catch (error) {
    next(error);
  }
}

async function getOrderById(req, res, next) {
  try {
    res.send(await OrderService.getOrder(req.params.id));
    logger.info(`GET /pedidos/${req.params.id}`);
  } catch (error) {
    next(error);
  }
}

async function deleteOrderById(req, res, next) {
  try {
    await OrderService.deleteOrder(req.params.id);
    res.end();
    logger.info(`DELETE /pedidos/${req.params.id}`);
  } catch (error) {
    next(error);
  }
}

async function updateOrder(req, res, next) {
  try {
    let order = req.body;

    if (!order.id || !order.cliente || !order.produto || order.valor == null) {
      throw new Error("Id, Cliente, Produto e Valor são obrigatórios");
    }

    res.send(await OrderService.updateOrder(order));
    logger.info(`PUT /pedidos - ${JSON.stringify(order)}`);
  } catch (error) {
    next(error);
  }
}

async function updateOrderStatus(req, res, next) {
  try {
    let order = req.body;

    if (order.entregue == null) {
      throw new Error("O campo entregue é obrigatório");
    }

    if (typeof order.entregue != "boolean") {
      throw new Error("O campo entregue deve ser Boolean");
    }

    res.send(await OrderService.updateOrderStatus(req.body));
    logger.info("PATCH /pedidos/updateOrderStatus");
  } catch (error) {
    next(error);
  }
}

async function getOrdersSumByName(req, res, next) {
  try {
    let { cliente } = req.body;

    if (!cliente) {
      throw new Error(
        "O campo 'cliente' contendo nome do cliente deve ser informado."
      );
    }
    res.send(await OrderService.getOrdersSumByName(cliente));
    logger.info("POST /pedidos/getOrdersSumByName");
  } catch (error) {
    next(error);
  }
}

async function getOrdersSumByProduct(req, res, next) {
  try {
    let { produto } = req.body;

    if (!produto) {
      throw new Error(
        "O campo 'produto' contendo nome do produto deve ser informado."
      );
    }
    res.send(await OrderService.getOrdersSumByProduct(produto));
    logger.info("POST /pedidos/getOrdersSumByProduct");
  } catch (error) {
    next(error);
  }
}

async function getMostOrderedProducts(req, res, next) {
  try {
    res.send(await OrderService.getMostOrderedProducts());
    logger.info(`GET /getMostOrderedProducts`);
  } catch (error) {
    next(error);
  }
}

export default {
  createOrder,
  getOrders,
  getOrderById,
  deleteOrderById,
  updateOrder,
  updateOrderStatus,
  getOrdersSumByName,
  getOrdersSumByProduct,
  getMostOrderedProducts,
};
