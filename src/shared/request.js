const getRequestInfo = (req) => {
  const requestInfo = {
    method: req.method,
    path: req.path,
  };
  if (req.headers.authorization) requestInfo.auth = req.headers.authorization;
  if (Object.keys(req.params).length > 0) {
    requestInfo.params = req.params;
  }
  if (Object.keys(req.query).length > 0) {
    requestInfo.query = req.query;
  }
  if (Object.keys(req.body).length > 0) {
    requestInfo.body = req.body;
  }
  return requestInfo;
};

const request = { getRequestInfo };

module.exports = request;
