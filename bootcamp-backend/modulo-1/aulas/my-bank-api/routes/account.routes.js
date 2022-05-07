import AccountController from "../controllers/account.controller.js";
import express from "express";
const router = express.Router();

router.post("/", AccountController.createAccount);
router.get("/", AccountController.getAccounts);
router.get("/:id", AccountController.getAccountById);
router.delete("/:id", AccountController.deleteAccountById);
router.put("/", AccountController.updateAccount);
router.patch("/updateBalance", AccountController.updateBalance);

router.use("", (error, req, res, next) => {
  logger.error(`${req.method} ${req.baseUrl} => ${error.message}`);
  res.status(400).send({ error: error.message });
});

export default router;
