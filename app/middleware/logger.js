const winston = require("winston");
const morgan = require("morgan");
const { combine, timestamp, prettyPrint, colorize, simple } = winston.format;
const today = new Date().toISOString().slice(0, 10);
const logger = winston.createLogger({
  level: "info",
  format: combine(timestamp(), prettyPrint()),
  transports: [new winston.transports.File({ filename: `./logs/${today}.log`, level: "warn" })],
});

function useLoggers(app) {
  app.use(morgan("dev"));
  if (process.env.NODE_ENV !== "production") {
    logger.add(
      new winston.transports.Console({
        format: combine(colorize(), simple()),
      })
    );
  }
  return logger;
}

module.exports = { logger, useLoggers };
