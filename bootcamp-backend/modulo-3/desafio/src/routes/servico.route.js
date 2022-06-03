import express from "express";
import ServicoController from "../controllers/servico.controller.js";

const router = express.Router();

router.post("/", ServicoController.createServico);
router.get("/", ServicoController.getServicos);
router.get("/:id", ServicoController.getServico);
router.delete("/:id", ServicoController.deleteServico);
router.put("/", ServicoController.updateServico);

export default router;
