const { AppError } = require("../shared/shared.index");

/**
 *  Middleware to extract the id from the request.
 * @description Adds the id to the args array in the request.
 * @returns The id of the request.
 * @throws An error if the id is not present or not a number.
 */
const getId = (req, res, next) => {
  const id = req.params.id;
  if (!id) {
    return next(new AppError("Id is required", "VALIDATION", "getId"));
  }
  if (isNaN(id)) {
    return next(new AppError("Id should be a number", "VALIDATION", "getId"));
  }
  if (!req.args) req.args = [];
  req.args.push(id);
  next();
};

/**
 * Middleware to extract the body from the request.
 * @description Adds the body to the args array in the request.
 * @returns The body of the request.
 * @throws An error if the body is not present.
 */
const getBody = (req, res, next) => {
  const body = req.body;
  if (!body) {
    return next(new AppError("Body is required", "VALIDATION", "getBody"));
  }
  if (!req.args) req.args = [];
  req.args.push(body);
  next();
};

/**
 * A function to control the flow of the request and ensure content.
 * @param {*} serviceFn The service function to call.
 * @returns Continues the flow of the request.
 * @throws An error if the service function throws an error.
 */
const control = (serviceFn) => {
  return async (req, res, next) => {
    try {
      const body = await call(req, serviceFn);
      res.status(getOk(req)).json(body);
    } catch (error) {
      next(error);
    }
  };
};

const call = async (req, serviceFn) => {
  setUserId(req);
  const args = req.args;
  if (!args) return await serviceFn();
  return await serviceFn(...args);
};

const setUserId = (req) => {
  if (req.auth && req.auth.sub) {
    if (!req.args) req.args = [];
    req.args.push(+req.auth.sub);
  }
};

const getOk = (req) => {
  const method = req.method;
  if (method === "POST") return 201;
  if (method === "DELETE") return 204;
  return 200;
};

module.exports = { control, getId, getBody };
