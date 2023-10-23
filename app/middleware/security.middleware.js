const cors = require("cors");
const helmet = require("helmet");
const env = require("dotenv").config().parsed;
const shared = require("../shared/shared.index");
const { AppError } = shared.models;
const apiKey = env.API_KEY;

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
 * Not user related security middleware functions.
 * @description General protection and API Key guards.
 */
module.exports = security = {
  /**
   * CORS, attack protection and guard routes that require a valid API Key.
   */
  useSecurity,
};
