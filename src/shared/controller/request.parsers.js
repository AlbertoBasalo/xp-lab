const AppError = require("./../errors/app-error");
function getId(req) {
  const id = req.params.id;
  if (!id) {
    throw new AppError("Id is required", "VALIDATION", 400);
  }
  if (isNaN(id)) {
    throw new AppError("Id should be a number", "VALIDATION", 400);
  }
  return id;
}

function getBody(req) {
  const body = req.body;
  if (!body) {
    throw new AppError("Body is required", "VALIDATION", 400);
  }
  return body;
}

module.exports = { getId, getBody };
