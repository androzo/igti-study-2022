import express from "express";
import accountsRouter from "./routes/account.routes.js";
import { promises as fs } from "fs";
const { readFile, writeFile } = fs;
import winston from "winston";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import { swaggerDocument } from "./doc.js";
import Schema from "./schema/index.js";
import { graphqlHTTP } from "express-graphql";
import AccountService from "./services/account.service.js";
const { label, combine, printf, timestamp } = winston.format;

const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});

global.logger = winston.createLogger({
  level: "silly",
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "mylog.log" }),
  ],
  format: combine(label({ label: "my-app" }), timestamp(), myFormat),
});

// const schema = buildSchema(`
//   type Account {
//     id: Int
//     name: String
//     balance: Float
//   }

//   input AccountInput {
//     id: Int
//     name: String
//     balance: Float
//   }

//   type Query {
//     getAccounts: [Account]
//     getAccount(id: Int): Account
//   }

//   type Mutation {
//     createAccount(account: AccountInput): Account
//     deleteAccount(id: Int): Boolean
//     updateAccount(account: AccountInput): Account
//   }

// `);

const root = {
  getAccounts: () => AccountService.getAccounts(),
  getAccount(args) {
    return AccountService.getAccountById(args.id);
  },
  createAccount({ account }) {
    return AccountService.createAccount(account);
  },
  deleteAccount(args) {
    AccountService.deleteAccount(args.id);
  },
  updateAccount({ account }) {
    return AccountService.updateAccount(account);
  },
};

const app = express();
app.use(express.json());
app.use(express.static("public"));
app.use(cors());
app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/account", accountsRouter);

app.use(
  "/graphql",
  graphqlHTTP({
    schema: Schema,
    graphiql: true,
  })
);

app.listen(3000, async () => {
  try {
    await readFile(global.fileName);
    logger.info("my-bank-api started");
  } catch (err) {
    const initialJson = {
      nextId: 1,
      accounts: [],
    };
    writeFile(global.fileName, JSON.stringify(initialJson))
      .then(() => {
        logger.info("my-bank-api started with new JSON");
      })
      .catch((err) => {
        logger.error(err);
      });
  }
});
