const cors = require("cors");
const helmet = require("helmet");
const { expressjwt: jwt } = require("express-jwt");
const { AppError } = require("../shared");

const apiKey = (req, res, next) => {
  const key = req.headers["x-api-key"];
  if (!key) {
    const err = new AppError("API Key Required", "UNAUTHORIZED", "apiKey");
    return next(err);
  }
  next();
};

const checkUser = jwt({
  secret: process.env.JWT_SECRET || "secret",
  algorithms: ["HS256"],
  credentialsRequired: true,
});

const getUser = jwt({
  secret: process.env.JWT_SECRET || "secret",
  algorithms: ["HS256"],
  credentialsRequired: false,
});

const configure = (app) => {
  app.use(cors());
  app.use(helmet());
  app.use(apiKey);
};

module.exports = { configure, checkUser, getUser };
