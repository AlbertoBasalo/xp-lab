const winston = require("winston");
const { combine, timestamp, label, prettyPrint, colorize, simple } = winston.format;
const today = new Date().toISOString().slice(0, 10);
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
module.exports = logger;
