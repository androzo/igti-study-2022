import express from "express";
import winston from "winston";
const { label, combine, printf, timestamp } = winston.format;
import marcasRouter from "./routes/marcas.js";

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
app.use("/marcas", marcasRouter);

app.listen(3000, async () => {
  try {
    logger.info("Cars API started");
  } catch (err) {
    logger.error("Error starting application");
  }
});
