let _logger;

/**
 * Middleware function for handling errors
 * @param {*} err the error object
 * @param {*} req the current request
 * @param {*} res the current response
 * @param {*} next the next middleware
 * @returns
 */
const appErrorHandler = (err, req, res, next) => {
  const appError = createAppError(err);
  fillJwtErrorInfo(appError);
  logAppError(appError, err.stack);
  if (res.headersSent) return next(err);
  const errorStatus = getErrorStatus(appError.kind);
  res.status(errorStatus).json(appError);
};

const createAppError = (err) => {
  return {
    message: err.message || "Something went wrong",
    kind: err.kind || "unhandled",
    source: err.source || "unknown",
  };
};

const fillJwtErrorInfo = (appError) => {
  const jtwMessages = ["No authorization token was found", "invalid token"];
  if (jtwMessages.includes(appError.message)) {
    appError.kind = "UNAUTHORIZED";
    appError.source = "jwt";
  }
};

const getErrorStatus = (kind) => {
  if (kind === "VALIDATION") return 400;
  if (kind === "NOT_FOUND") return 404;
  if (kind === "UNAUTHORIZED") return 401;
  if (kind === "FORBIDDEN") return 403;
  if (kind === "CONFLICT") return 409;
  return 500;
};

function logAppError(appError, stack) {
  if (appError.kind === "unhandled") _logger.error({ ...appError, stack });
  else _logger.warn({ ...appError });
}

const useErrorHandler = (app, logger) => {
  _logger = logger;
  app.use(appErrorHandler);
};

const errors = { useErrorHandler };
module.exports = errors;
