import express from "express";
import winston from "winston";

const app = express();
app.use(express.json());

const { label, combine, printf, timestamp } = winston.format;

const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});

const logger = winston.createLogger({
  level: "warn",
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "mylog.log" }),
  ],
  format: combine(label({ label: "my-app" }), timestamp(), myFormat),
});

logger.error("Error log");
logger.warn("Warning log");
logger.verbose("Verbose log");
logger.debug("Debug log");
logger.silly("Silly log");
logger.log("info", "Info log");

app.listen(3000, () => {
  console.log("API started");
});
