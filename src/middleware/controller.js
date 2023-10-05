const { AppError } = require("../shared");

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

const getBody = (req, res, next) => {
  const body = req.body;
  if (!body) {
    return next(new AppError("Body is required", "VALIDATION", "getBody"));
  }
  if (!req.args) req.args = [];
  req.args.push(body);
  next();
};

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
  const args = req.args;
  getUserId(req, args);
  if (!args) return await serviceFn();
  return await serviceFn(...args);
};

const getUserId = (req, args) => {
  if (req.auth) {
    if (!args) req.args = [];
    args.push(+req.auth.sub);
  }
};

const getOk = (req) => {
  const method = req.method;
  if (method === "POST") return 201;
  if (method === "DELETE") return 204;
  return 200;
};

module.exports = { control, getId, getBody };
