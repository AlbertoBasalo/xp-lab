const winston = require("winston");
const morgan = require("morgan");
const env = require("dotenv").config().parsed;
const { request } = require("../../shared/_shared.index");
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

const logger = winston.createLogger({ transports });

/**
 * Input pipe for Morgan logger
 */
logger.stream = {
  write: function (message, encoding) {
    // remove last \n
    const messageClean = message.slice(0, -1);
    logger.http(messageClean);
  },
};

const useLoggers = (app) => {
  // use morgan to sent requests to winston logger
  app.use(morgan("dev", { stream: logger.stream }));
};

/**
 * Middleware function for verbose logging requests
 * @description Cautious: this function logs the request body
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const debugReq = (req, res, next) => {
  const reqMessage = `${new Date().toLocaleTimeString()}`;
  const reqData = request.getRequestInfo(req);
  logger.debug(reqMessage, reqData);
  next();
};

/**
 * Configures the application logger and provide logging utilities
 */
const logs = {
  logger,
  useLoggers,
  debugReq,
};

module.exports = logs;
