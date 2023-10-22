/**
 * A function to control the flow of the request and ensure response content.
 * @param {*} serviceFn The service function to call.
 * @returns Responds with the result of the service function and the appropriate status code.
 * @throws An error to the next middleware when the service function fails.
 */
const control = (serviceFn) => {
  return async (req, res, next) => {
    try {
      const body = await serviceFn(...req.args);
      const status = getResponseStatus(req.method, body);
      res.status(status).json(body);
    } catch (error) {
      next(error);
    }
  };
};

const getResponseStatus = (method, body) => {
  if (method === "POST" || method === "PUT") return 201;
  if (method === "DELETE") return 204;
  if (isNullOrEmpty(body)) return 204;
  return 200;
};

const isNullOrEmpty = (value) => {
  if (!value) return true;
  if (Array.isArray(value)) return value.length === 0;
  if (typeof value === "object") return Object.keys(value).length === 0;
  return value === "";
};

/**
 * Functions to control the flow of the request and ensure coherent response.
 * @description Handles errors and security identification.
 */
const controller = {
  control,
};

module.exports = controller;
