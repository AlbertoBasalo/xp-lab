const cors = require("cors");
const helmet = require("helmet");
const env = require("dotenv").config().parsed;
const { AppError } = require("../../shared/shared.index");
const apiKey = env.API_KEY;

/**
 * Guard routes that require a valid API Key.
 */
const guardApiKey = (req, res, next) => {
  const key = req.headers["x-api-key"];
  if (!key || key !== apiKey) {
    const err = new AppError("API Key Required", "UNAUTHORIZED", "guardApiKey");
    return next(err);
  }
  next();
};
const useSecurity = (app) => {
  app.use(cors());
  app.use(helmet());
  app.use(guardApiKey);
};

/**
 * Security related middleware functions.
 * @description Configures JWT for user identification and API Key guards.
 */
const security = {
  useSecurity,
};

module.exports = security;
