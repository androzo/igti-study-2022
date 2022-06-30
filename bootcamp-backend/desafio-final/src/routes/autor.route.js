import express from "express";
import AuthorController from "../controllers/autor.controller.js";

const router = express.Router();

router.post("/", AuthorController.createAuthor);
router.get("/", AuthorController.getAuthors);
router.get("/:id", AuthorController.getAuthor);
router.delete("/:id", AuthorController.deleteAuthor);
router.put("/", AuthorController.updateAuthor);

export default router;
