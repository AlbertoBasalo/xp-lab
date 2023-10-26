const shared = require("../shared/shared.index");
const { utils } = shared;
const { logger } = utils;
/**
 * A function to control the flow of the request and ensure response content or error.
 * @param {*} serviceFn The service function to call.
 * @returns Responds with the result of the service function and the appropriate status code.
 * @throws An error to the next middleware when the service function fails.
 */
const control = (serviceFn) => {
  return async (req, res, next) => {
    try {
      const body = req.args ? await serviceFn(...req.args) : await serviceFn();
      const statusCode = getStatusCode(req.method, body);
      logger.debug(new Date().toLocaleTimeString() + " res => ", { statusCode, body });
      res.status(statusCode).json(body);
    } catch (error) {
      next(error);
    }
  };
};

const getStatusCode = (method, body) => {
  if (method === "POST" || method === "PUT") return 201;
  if (method === "DELETE") return 204;
  if (isEmpty(body)) return 204;
  return 200;
};

const isEmpty = (value) => {
  if (Array.isArray(value)) return value.length === 0;
  if (typeof value === "object") return Object.keys(value).length === 0;
  return value === "";
};

/**
 * Functions to control the flow of the request and ensure coherent response.
 * @description Handles errors and security identification.
 */
module.exports = controller = {
  control,
};
