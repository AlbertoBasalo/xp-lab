const { AppError } = require("../shared/_shared");
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
  if (isJwtError) return new AppError(err.message, "UNAUTHORIZED", "express-jwt", err);
  return new AppError(err.message, "UNHANDLED", "unknown", err);
};

const logAppError = (appError, req) => {
  if (appError.kind === "UNHANDLED") {
    const requestFullInfo = {
      method: req.method,
      path: req.path,
      params: req.params,
      query: req.query,
      body: req.body,
      auth: req.headers.authorization,
    };
    const errorEntry = { message: appError.message, error: appError.getFullInfo(), request: requestFullInfo };
    _logger.error(errorEntry);
  } else {
    const requestInfo = { method: req.method, path: req.path, auth: req.headers.authorization };
    _logger.warn({ message: appError.message, error: appError.getInfo(), request: requestInfo });
  }
};

const sendErrorResponse = (res, appError) => {
  if (res.headersSent) return next(appError);
  const errorStatus = getErrorStatus(appError.kind);
  res.status(errorStatus).json(appError.getBasicInfo());
};

const getErrorStatus = (kind) => {
  if (kind === "UNHANDLED") return 500;
  if (kind === "CONFLICT") return 409;
  if (kind === "NOT_FOUND") return 404;
  if (kind === "FORBIDDEN") return 403;
  if (kind === "UNAUTHORIZED") return 401;
  return 400;
};

const useErrorHandler = (app, logger) => {
  _logger = logger;
  app.use(appErrorHandler);
};

const errors = { useErrorHandler };
module.exports = errors;
