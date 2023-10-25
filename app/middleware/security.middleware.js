const cors = require("cors");
const helmet = require("helmet");
const crypto = require("crypto");
const env = require("dotenv").config().parsed;
const shared = require("../shared/shared.index");
const { logger } = shared.utils;
const { AppError } = shared.models;
const apiKey = env.API_KEY;
const secret = env.JWT_SECRET;

const guardApiKey = (req, res, next) => {
  const key = req.headers["x-api-key"];
  if (!key || key !== apiKey) {
    const err = new AppError("API Key Required", "UNAUTHORIZED", "guardApiKey");
    return next(err);
  }
  next();
};

const hashCredentials = (req, res, next) => {
  const credentials = req.body;
  if (credentials.password) credentials.password = hash(credentials.password, secret);
  next();
};

const hash = (password, secret) => {
  const hmac = crypto.createHmac("sha256", secret);
  hmac.update(password);
  return hmac.digest("hex");
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
  /**
   * Middleware specialized to hash the credentials form the body of the request.
   * @description Hashes the password in present at the body content.
   */
  hashCredentials,
};
