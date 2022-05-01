import express from "express";
import { promises as fs, write } from "fs";
const { readFile, writeFile } = fs;

const router = express.Router();

global.fileName = "accounts.json";

const readAccountsFile = async () =>
  JSON.parse(await readFile(global.fileName));

const writeAccountsFile = async (data) =>
  await writeFile(global.fileName, JSON.stringify(data, null, 2));

// POST - cadastro de nova conta
router.post("/", async (req, res, next) => {
  try {
    let account = req.body;

    if (!account.name || account.balance == null) {
      throw new Error("Name e balance são obrigatórios");
    }

    const data = await readAccountsFile();

    account = {
      id: data.nextId++,
      name: account.name,
      balance: account.balance,
    };
    data.accounts.push(account);

    writeAccountsFile(data);
    res.send(account);
    logger.info(`POST /account - ${JSON.stringify(account)}`);
  } catch (error) {
    next(error);
  }
});

// GET - buscar todas contas
router.get("/", async (req, res, next) => {
  try {
    const data = await readAccountsFile();
    delete data.nextId;
    res.send(data);
    logger.info("GET /account");
  } catch (error) {
    next(error);
  }
});

// GET - buscar conta por id
router.get("/:id", async (req, res, next) => {
  try {
    const data = await readAccountsFile();
    const account = data.accounts.find(
      (account) => account.id == req.params.id
    );
    res.send(account);
    logger.info(`GET /account/${req.params.id}`);
  } catch (error) {
    next(error);
  }
});

// DELETE - remover conta por id
router.delete("/:id", async (req, res, next) => {
  try {
    const data = await readAccountsFile();
    data.accounts = data.accounts.filter(
      (account) => account.id != req.params.id
    );
    writeAccountsFile(data);
    res.end();
    logger.info(`DELETE /account/${req.params.id}`);
  } catch (error) {
    next(error);
  }
});

// PUT - Atualiza conta
router.put("/", async (req, res, next) => {
  try {
    let account = req.body;

    if (!account.id || !account.name || account.balance == null) {
      throw new Error("Id, Name e balance são obrigatórios");
    }

    const data = await readAccountsFile();
    const index = data.accounts.findIndex((obj) => obj.id === account.id);

    if (index == -1) {
      throw new Error("Registro não encontrado.");
    }

    data.accounts[index].name = account.name;
    data.accounts[index].balance = account.balance;
    writeAccountsFile(data);
    res.send(data.accounts[index]);
    logger.info(`PUT /account - ${JSON.stringify(account)}`);
  } catch (error) {
    next(error);
  }
});

// PATCH - Atualiza conta
router.patch("/updateBalance", async (req, res, next) => {
  try {
    let account = req.body;
    const data = await readAccountsFile();
    const index = data.accounts.findIndex((obj) => obj.id === account.id);

    if (index == -1) {
      throw new Error("Registro não encontrado.");
    }

    if (!account.id || account.balance == null) {
      throw new Error("Id e balance são obrigatórios");
    }

    data.accounts[index].balance = account.balance;
    writeAccountsFile(data);
    res.send(data.accounts[index]);
    logger.info(
      `PATCH /account/updateBalance - ${JSON.stringify(data.accounts[index])}`
    );
  } catch (error) {
    next(error);
  }
});

// Tratamentos de erro
router.use("", (error, req, res, next) => {
  logger.error(`${req.method} ${req.baseUrl} => ${error.message}`);
  res.status(400).send({ error: error.message });
});

export default router;
