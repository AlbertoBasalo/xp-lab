const morgan = require("morgan");
const shared = require("../shared/shared.index");
const { logger, request } = shared.utils;

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
 * Middleware functions for automatic and custom logging
 */
module.exports = logs = {
  /** Use a customized logger for every request */
  useLoggers,
  /** Middleware function for verbose logging any request you want */
  debugReq,
};
