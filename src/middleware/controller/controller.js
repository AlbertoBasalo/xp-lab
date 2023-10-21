/**
 * A function to control the flow of the request and ensure content.
 * @param {*} serviceFn The service function to call.
 * @returns Continues the flow of the request.
 * @throws An error to the next middleware when the service function fails.
 */
const control = (serviceFn) => {
  return async (req, res, next) => {
    try {
      fillArgsWithUserId(req);
      const body = await callService(serviceFn, req.args);
      const status = getStatusByMethod(req.method);
      res.status(status).json(body);
    } catch (error) {
      next(error);
    }
  };
};

const fillArgsWithUserId = (req) => {
  const userId = req.auth?.sub;
  if (!userId) return;
  if (!req.args) req.args = [];
  req.args.push(+userId);
};

const callService = async (serviceFn, args) => {
  if (args) {
    return await serviceFn(...args);
  } else {
    return await serviceFn();
  }
};

const getStatusByMethod = (method) => {
  if (method === "POST") return 201;
  if (method === "DELETE") return 204;
  return 200;
};

/**
 * Functions to control the flow of the request and ensure coherent response.
 * @description Handles errors and security identification.
 */
const controller = {
  control,
};

module.exports = controller;
