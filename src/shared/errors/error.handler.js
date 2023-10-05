let logger;
const getStatus = (err) => {
  const kind = err.kind || "unhandled";
  if (kind === "VALIDATION") return 400;
  if (kind === "NOT_FOUND") return 404;
  if (kind === "UNAUTHORIZED") return 401;
  if (kind === "FORBIDDEN") return 403;
  return 500;
};

const ErrorHandler = (err, req, res, next) => {
  const errInfo = {
    message: err.message || "Something went wrong",
    kind: err.kind,
    source: err.source,
  };
  logger.error({ ...errInfo });
  const errStatus = getStatus(err);
  res.status(errStatus).json(errInfo);
};

const configure = (app, logger) => {
  logger = logger;
  app.use(ErrorHandler);
};

module.exports = { configure };
