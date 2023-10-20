/**
 * Extracts useful information from the request object
 * @param req the current request
 * @returns An object with the request information
 */
const getRequestInfo = (req) => {
  const requestInfo = {
    method: req.method,
    path: req.path,
  };
  if (req.headers.authorization) requestInfo.auth = req.headers.authorization.substring(0, 10);
  if (hasInfo(req.params)) {
    requestInfo.params = req.params;
  }
  if (hasInfo(req.query)) {
    requestInfo.query = req.query;
  }
  if (hasInfo(req.body)) {
    requestInfo.body = req.body;
  }
  return requestInfo;
};

const hasInfo = (property) => Object.keys(property).length > 0;

const request = { getRequestInfo };

module.exports = request;
