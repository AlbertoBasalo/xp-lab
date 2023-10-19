const { AppError } = require("../shared/_shared");
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
 * Middleware to extract params and the body from the request.
 * @description Adds the params and the body to the args array in the request.
 * @throws An error if the params or the body is not present.
 */
const validations = {
  getId,
  getBody,
};
module.exports = validations;
