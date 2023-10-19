const winston = require("winston");
const morgan = require("morgan");
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

const transports = process.env.NODE_ENV === "production" ? [fileTransport] : [fileTransport, consoleTransport];

const logger = winston.createLogger({
  transports,
  exitOnError: false,
});

logger.stream = {
  write: function (message, encoding) {
    logger.http(message);
  },
};

const useLoggers = (app) => {
  app.use(morgan("dev", { stream: logger.stream }));
};

const debugReq = (req, res, next) => {
  const reqMessage = `${req.method} ${req.path}`;
  const reqData = {};
  reqData.params = req.params;
  reqData.query = req.query;
  reqData.body = req.body;
  if (req.headers.authorization) reqData.auth = req.headers.authorization;
  logger.debug(reqMessage, reqData);
  next();
};

/**
 * Configures and returns the application logger
 */
const logs = {
  logger,
  useLoggers,
  debugReq,
};

module.exports = logs;
