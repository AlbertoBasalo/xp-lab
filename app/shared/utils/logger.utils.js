const winston = require("winston");
const env = require("dotenv").config().parsed;
const { combine, timestamp, prettyPrint, colorize, simple } = winston.format;
const today = new Date().toISOString().slice(0, 10);

const fileTransport = new winston.transports.File({
  level: "info",
  filename: `./logs/${today}.log`,
  format: combine(timestamp(), prettyPrint()),
});

const consoleTransport = new winston.transports.Console({
  level: "debug",
  format: combine(colorize(), simple()),
});

const transports = env.NODE_ENV === "production" ? [fileTransport] : [fileTransport, consoleTransport];

/** Application Logger */
const logger = winston.createLogger({ transports });

module.exports = logger;
