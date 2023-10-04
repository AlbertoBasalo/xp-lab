const ErrorHandler = (err, req, res, next) => {
  const errStatus = err.statusCode || 500;
  const errMsg = err.message || "Something went wrong";
  const errorInfo = {
    success: false,
    status: errStatus,
    message: errMsg,
    kind: err.kind,
    stack: process.env.NODE_ENV === "development" ? err.stack : {},
  };
  console.log(errorInfo);
  res.status(errStatus).json(errorInfo);
};

export default ErrorHandler;
