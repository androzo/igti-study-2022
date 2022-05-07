import AccountService from "../services/account.service.js";

async function createAccount(req, res, next) {
  try {
    let account = req.body;

    if (!account.name || account.balance == null) {
      throw new Error("Name e balance são obrigatórios");
    }

    await AccountService.createAccount(account);

    res.send(account);
    logger.info(`POST /account - ${JSON.stringify(account)}`);
  } catch (error) {
    next(error);
  }
}

async function getAccounts(req, res, next) {
  try {
    res.send(await AccountService.getAccounts());
    logger.info("GET /account");
  } catch (error) {
    next(error);
  }
}

async function getAccountById(req, res, next) {
  try {
    res.send(await AccountService.getAccountById(req.params.id));
    logger.info(`GET /account/${req.params.id}`);
  } catch (error) {
    next(error);
  }
}

async function deleteAccountById(req, res, nex) {
  try {
    await AccountService.deleteAccountById(req.params.id);
    res.end();
    logger.info(`DELETE /account/${req.params.id}`);
  } catch (error) {
    next(error);
  }
}

async function updateAccount(req, res, next) {
  try {
    let account = req.body;

    if (!account.id || !account.name || account.balance == null) {
      throw new Error("Id, Name e balance são obrigatórios");
    }

    res.send(await AccountService.updateAccount(account));
    logger.info(`PUT /account - ${JSON.stringify(account)}`);
  } catch (error) {
    next(error);
  }
}

async function updateBalance(req, res, next) {
  try {
    res.send(await AccountService.updateBalance(req.body));
    logger.info("PATCH /account/updateBalance");
  } catch (error) {
    next(error);
  }
}

export default {
  createAccount,
  getAccounts,
  getAccountById,
  deleteAccountById,
  updateAccount,
  updateBalance,
};
