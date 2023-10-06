let _logger;
const getStatus = (err) => {
  const { kind } = err;
  if (kind === "VALIDATION") return 400;
  if (kind === "NOT_FOUND") return 404;
  if (kind === "UNAUTHORIZED") return 401;
  if (kind === "FORBIDDEN") return 403;
  if (kind === "CONFLICT") return 409;
  return 500;
};

const ErrorHandler = (err, req, res, next) => {
  if (res.headersSent) return next(err);
  checkJwtErrors(err);
  const errInfo = {
    message: err.message || "Something went wrong",
    kind: err.kind || "unhandled",
    source: err.source || "unknown",
  };
  if (errInfo.kind === "unhandled") _logger.error({ ...errInfo });
  else _logger.warn({ ...errInfo });
  const errStatus = getStatus(errInfo);
  res.status(errStatus).json(errInfo);
};

const handleErrors = (app, logger) => {
  _logger = logger;
  app.use(ErrorHandler);
};

module.exports = { handleErrors };
function checkJwtErrors(err) {
  const jtwMessages = ["No authorization token was found", "invalid token"];
  if (jtwMessages.includes(err.message)) {
    err.kind = "UNAUTHORIZED";
    err.source = "jwt";
  }
}
