const shared = require("../shared/shared.index");
const { utils, models } = shared;
const { AppError } = models;
const { logger, request } = utils;

/**
 * Middleware function for handling errors
 * @description writes a detailed log and responds with the appropriate status code
 */
const appErrorHandler = (err, req, res, next) => {
  const appError = wrapError(err);
  logError(appError, req);
  sendResponse(res, appError);
};

const wrapError = (err) => {
  if (err instanceof AppError) return err;
  const isTokenExpired = err.message.includes("jwt expired");
  if (isTokenExpired) return new AppError(err.message, "UNAUTHORIZED", "express-jwt");
  const isJwtError = err.message.includes("token");
  if (isJwtError) return new AppError(err.message, "UNAUTHORIZED", "express-jwt");
  return new AppError(err.message, "UNHANDLED", getSource(err.stack));
};

const logError = (appError, req) => {
  const requestInfo = request.getRequestInfo(req);
  const errorEntry = { message: appError.message, err: appError.getInfo(), req: requestInfo };
  if (appError.kind === "UNHANDLED") {
    logger.error(errorEntry);
  } else {
    logger.warn(errorEntry);
  }
};

const sendResponse = (res, appError) => {
  if (res.headersSent) return next(appError);
  const statusCode = getStatusCode(appError.kind);
  res.status(statusCode).json(appError.message);
};

const getStatusCode = (kind) => {
  const errorCodes = {
    UNHANDLED: 500,
    CONFLICT: 409,
    NOT_FOUND: 404,
    FORBIDDEN: 403,
    UNAUTHORIZED: 401,
  };
  const errorCode = errorCodes[kind] || 400;
  return errorCode;
};

const getSource = (stack) => {
  const stackArray = stack.split("\n");
  const logStack = stackArray.slice(1, 2).join().trim();
  return logStack;
};

/** Error handle middleware */
module.exports = errorHandler = {
  /** Configures and attaches an error handler to the app */
  useErrorHandler: (app) => app.use(appErrorHandler),
};
