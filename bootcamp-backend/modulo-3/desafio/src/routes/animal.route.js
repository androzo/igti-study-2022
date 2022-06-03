import express from "express";
import PetController from "../controllers/animal.controller.js";

const router = express.Router();

router.post("/", PetController.createPet);
router.get("/", PetController.getPets);
router.get("/:id", PetController.getPet);
router.delete("/:id", PetController.deletePet);
router.put("/", PetController.updatePet);

export default router;
