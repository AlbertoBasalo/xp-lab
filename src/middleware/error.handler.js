let _logger;
const getStatus = (err) => {
  const kind = err.kind || "unhandled";
  if (kind === "VALIDATION") return 400;
  if (kind === "NOT_FOUND") return 404;
  if (kind === "UNAUTHORIZED") return 401;
  if (kind === "FORBIDDEN") return 403;
  return 500;
};

const ErrorHandler = (err, req, res, next) => {
  if (res.headersSent) return next(err);
  if ((err.message = "No authorization token was found")) {
    err.kind = "UNAUTHORIZED";
    err.source = "jwt";
  }
  const errInfo = {
    message: err.message || "Something went wrong",
    kind: err.kind,
    source: err.source,
  };
  _logger.error({ ...errInfo });
  const errStatus = getStatus(err);
  res.status(errStatus).json(errInfo);
};

const configure = (app, logger) => {
  _logger = logger;
  app.use(ErrorHandler);
};

module.exports = { configure };
