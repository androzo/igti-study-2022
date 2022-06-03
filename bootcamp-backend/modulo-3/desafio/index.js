import express from "express";
import ownerRouter from "./src/routes/proprietario.route.js";
import petRouter from "./src/routes/animal.route.js";
import servicoRouter from "./src/routes/servico.route.js";
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
    new winston.transports.File({ filename: "petstore-api.log" }),
  ],
  format: combine(label({ label: "petstore-api" }), timestamp(), myFormat),
});
const app = express();

app.use(express.json());
app.use(cors());
app.use("/proprietario", ownerRouter);
app.use("/animal", petRouter);
app.use("/servico", servicoRouter);
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
