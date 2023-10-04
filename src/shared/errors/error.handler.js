const logger = require("./../logger");
const ErrorHandler = (err, req, res, next) => {
  const errStatus = err.statusCode || 500;
  const errMsg = err.message || "Something went wrong";
  const errInfo = {
    message: errMsg,
    kind: err.kind,
  };
  logger.error({ ...errInfo });
  res.status(errStatus).json(errInfo);
};

module.exports = ErrorHandler;
