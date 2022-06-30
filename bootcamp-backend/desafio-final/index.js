import express from "express";
import authorRouter from "./src/routes/autor.route";
import bookRouter from "./src/routes/livro.route";
import saleRouter from "./src/routes/venda.route.js";
import clientRouter from "./src/routes/cliente.route.js";
import cors from "cors";
import winston from "winston";

const { combine, timestamp, label, printf } = winston.format;
const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level} ${message}`;
});

global.logger = winston.createLogger({
  level: "silly",
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "bookstore-api.log" }),
  ],
  format: combine(label({ label: "bookstore-api" }), timestamp(), myFormat),
});
const app = express();

app.use(express.json());
app.use(cors());
app.use("/proprietario", authorRouter);
app.use("/animal", bookRouter);
app.use("/sale", saleRouter);
app.use("/clients", clientRouter);
app.use((err, req, res, next) => {
  if (err.message) {
    res.status(400).send({ error: err.message });
    logger.error(`${req.method} ${req.base_url} ${err.message}`);
  } else {
    res.status(400).send({ errors: err });
    logger.error(`${req.method} ${req.base_url} ${err.message}`);
  }
});
app.listen(3000, () => console.log("API STARTED"));
