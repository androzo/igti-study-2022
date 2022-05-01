import express from "express";
import accountsRouter from "./routes/accounts.js";
import { promises as fs } from "fs";
const { readFile, writeFile } = fs;
import winston from "winston";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import { swaggerDocument } from "./doc.js";

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

const app = express();
app.use(express.json());
app.use(express.static("public"));
app.use(cors());
app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/account", accountsRouter);

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
