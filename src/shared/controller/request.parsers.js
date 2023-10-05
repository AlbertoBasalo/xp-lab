const AppError = require("../models/app-error");

function getId(req) {
  const id = req.params.id;
  if (!id) {
    throw new AppError("Id is required", "VALIDATION", "getId");
  }
  if (isNaN(id)) {
    throw new AppError("Id should be a number", "VALIDATION", "getId");
  }
  return id;
}

function getBody(req) {
  const body = req.body;
  if (!body) {
    throw new AppError("Body is required", "VALIDATION", "getBody");
  }
  return body;
}

module.exports = { getId, getBody };
