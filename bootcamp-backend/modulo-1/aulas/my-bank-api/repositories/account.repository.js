import { promises as fs, write } from "fs";
const { readFile, writeFile } = fs;

global.fileName = "accounts.json";

const readAccounts = async () => JSON.parse(await readFile(global.fileName));
const writeAccounts = async (data) =>
  await writeFile(global.fileName, JSON.stringify(data, null, 2));

const getAccounts = async () => {
  const data = await readAccounts();
  return data.accounts;
};

async function insertAccount(account) {
  const data = await readAccounts();
  account = {
    id: data.nextId++,
    name: account.name,
    balance: account.balance,
  };
  data.accounts.push(account);
  await writeAccounts(data);
  return account;
}

async function getAccount(id) {
  const data = await readAccounts();
  const account = data.accounts.find((account) => account.id == id);
  if (account) {
    return account;
  }
  throw new Error("Registro não encontrado");
}

async function deleteAccount(id) {
  const data = await readAccounts();
  data.accounts = data.accounts.filter((account) => account.id != id);
  await writeAccounts(data);
}

async function updateAccount(account) {
  const data = await readAccounts();
  const index = data.accounts.findIndex((obj) => obj.id === account.id);

  if (index == -1) {
    throw new Error("Registro não encontrado.");
  }

  data.accounts[index].name = account.name;
  data.accounts[index].balance = account.balance;
  await writeAccounts(data);
  return data.accounts[index];
}

export default {
  getAccounts,
  insertAccount,
  getAccount,
  deleteAccount,
  updateAccount,
};
