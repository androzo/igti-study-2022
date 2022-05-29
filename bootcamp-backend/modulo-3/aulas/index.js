import express from "express";
import clientsRouter from "./src/routes/client.route.js";
import productsRouter from "./src/routes/product.route.js";
import salesRouter from "./src/routes/sale.route.js";
import suppliersRouter from "./src/routes/supplier.route.js";
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
    new winston.transports.File({ filename: "store-api.log" }),
  ],
  format: combine(label({ label: "store-api" }), timestamp(), myFormat),
});
const app = express();

app.use(express.json());
app.use(cors());
app.use("/product", productsRouter);
app.use("/sale", salesRouter);
app.use("/supplier", suppliersRouter);
app.use("/client", clientsRouter);
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
