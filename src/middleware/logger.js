const winston = require("winston");
const { combine, timestamp, prettyPrint, colorize, simple } = winston.format;
const today = new Date().toISOString().slice(0, 10);

function configure() {
  const logger = winston.createLogger({
    level: "info",
    format: combine(timestamp(), prettyPrint()),
    transports: [new winston.transports.File({ filename: `./logs/${today}.log`, level: "error" })],
  });
  if (process.env.NODE_ENV !== "production") {
    logger.add(
      new winston.transports.Console({
        format: combine(colorize(), simple()),
      })
    );
  }
  return logger;
}

const logger = configure();

module.exports = logger;
