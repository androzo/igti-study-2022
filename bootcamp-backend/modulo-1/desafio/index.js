import express from "express";
import OrderRoutes from "./routes/pedidos.routes.js";
import { promises as fs } from "fs";
const { readFile, writeFile } = fs;
import winston from "winston";
import cors from "cors";
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
app.use("/pedidos", OrderRoutes);

app.listen(3000, async () => {
  try {
    await readFile(global.fileName);
    logger.info("delivery-api started");
  } catch (err) {
    logger.error(err);
  }
});
