const ErrorHandler = (err, req, res, next) => {
  const errStatus = err.statusCode || 500;
  const errMsg = err.message || "Something went wrong";
  const errInfo = {
    success: false,
    status: errStatus,
    message: errMsg,
    kind: err.kind,
    stack: process.env.NODE_ENV === "development" ? err.stack : {},
  };
  // ToDo: use a logger
  console.warn({ errInfo, stack: err.stack });
  res.status(errStatus).json(errInfo);
};

module.exports = ErrorHandler;
