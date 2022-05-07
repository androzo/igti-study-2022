import OrderController from "../controllers/pedidos.controller.js";
import express from "express";
const router = express.Router();

router.post("/", OrderController.createOrder);
router.get("/", OrderController.getOrders);
router.get("/:id", OrderController.getOrderById);
router.delete("/:id", OrderController.deleteOrderById);
router.put("/", OrderController.updateOrder);
router.patch("/updateStatus", OrderController.updateOrderStatus);
router.post("/getOrdersByCustomer", OrderController.getOrdersSumByName);
router.post("/getOrdersSumByProduct", OrderController.getOrdersSumByProduct);

router.use("", (error, req, res, next) => {
  logger.error(`${req.method} ${req.baseUrl} => ${error.message}`);
  res.status(400).send({ error: error.message });
});

export default router;
