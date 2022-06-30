import express from "express";
import BookController from "../controllers/livro.controller.js";

const router = express.Router();

router.post("/", BookController.createBook);
router.get("/", BookController.getBooks);
router.get("/:id", BookController.getBook);
router.delete("/:id", BookController.deleteBook);
router.put("/", BookController.updateBook);
router.post("/info", BookController.createBookInfo);
router.get("/info", BookController.getBookInfos);
router.post("/:id/avaliacao", BookController.createReview);

export default router;
