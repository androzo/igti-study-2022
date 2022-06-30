import express from "express";
import CustomerController from "../controllers/cliente.controller.js";

const router = express.Router();

router.post("/", CustomerController.createCustomer);
router.get("/", CustomerController.getCustomers);
router.get("/:id", CustomerController.getCustomer);
router.delete("/:id", CustomerController.deleteCustomer);
router.put("/", CustomerController.updateCustomer);

export default router;
