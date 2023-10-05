const cors = require("cors");
const helmet = require("helmet");
const jwt = require("jsonwebtoken");
const { expressjwt } = require("express-jwt");
const { AppError } = require("../shared");

const secret = process.env.JWT_SECRET || "secret";
const algorithms = ["HS256"];
const expiration = { expiresIn: "1d" };

const apiKey = (req, res, next) => {
  const key = req.headers["x-api-key"];
  if (!key) {
    const err = new AppError("API Key Required", "UNAUTHORIZED", "apiKey");
    return next(err);
  }
  next();
};

const guardUser = expressjwt({
  secret,
  algorithms,
  credentialsRequired: true,
});

const getUser = expressjwt({
  secret,
  algorithms,
  credentialsRequired: false,
});

const signUser = (userId) => jwt.sign({ sub: userId }, secret, expiration);

const configure = (app) => {
  app.use(cors());
  app.use(helmet());
  app.use(apiKey);
};

module.exports = { configure, guardUser, getUser, signUser };
