const { AppError, request } = require("../../shared/shared.index");
let _logger;

/**
 * Middleware function for handling (log and respond) errors
 * @param {*} err the error object
 * @param {*} req the current request
 * @param {*} res the current response
 * @param {*} next the next middleware
 * @returns
 */
const appErrorHandler = (err, req, res, next) => {
  const appError = wrapAppError(err);
  logAppError(appError, req);
  sendErrorResponse(res, appError);
};

const wrapAppError = (err) => {
  if (err instanceof AppError) return err;
  const isJwtError = err.message.includes("token");
  if (isJwtError) return new AppError(err.message, "UNAUTHORIZED", "express-jwt");
  return new AppError(err.message, "UNHANDLED", getSource(err.stack));
};

const logAppError = (appError, req) => {
  const requestInfo = request.getRequestInfo(req);
  const errorEntry = { message: appError.message, err: appError.getInfo(), req: requestInfo };
  if (appError.kind === "UNHANDLED") {
    _logger.error(errorEntry);
  } else {
    _logger.warn(errorEntry);
  }
};

const sendErrorResponse = (res, appError) => {
  if (res.headersSent) return next(appError);
  const errorStatus = getErrorStatus(appError.kind);
  res.status(errorStatus).json(appError.message);
};

const getErrorStatus = (kind) => {
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

const useErrorHandler = (app, logger) => {
  _logger = logger;
  app.use(appErrorHandler);
};

const getSource = (stack) => {
  const stackArray = stack.split("\n");
  const logStack = stackArray.slice(1, 2).join().trim();
  return logStack;
};

const errors = { useErrorHandler };
module.exports = errors;
