const shared = require("../shared/shared.index");
const { utils, models } = shared;
const { AppError } = models;
const { logger, request } = utils;

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
    logger.error(errorEntry);
  } else {
    logger.warn(errorEntry);
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

const getSource = (stack) => {
  const stackArray = stack.split("\n");
  const logStack = stackArray.slice(1, 2).join().trim();
  return logStack;
};

/** Error handle middleware */
const errors = {
  /** Configures and attaches an error handler to the app */
  useErrorHandler: (app) => app.use(appErrorHandler),
};
module.exports = errors;
