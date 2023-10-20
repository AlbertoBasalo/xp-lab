const cors = require("cors");
const helmet = require("helmet");
const jwt = require("jsonwebtoken");
const env = require("dotenv").config().parsed;
const { expressjwt } = require("express-jwt");
const { AppError } = require("../shared/_shared.index");

const secret = env.JWT_SECRET;
const apiKey = env.API_KEY;
const algorithms = ["HS256"];
const expiration = { expiresIn: "1y" };

const guardApiKey = (req, res, next) => {
  const key = req.headers["x-api-key"];
  if (!key || key !== apiKey) {
    const err = new AppError("API Key Required", "UNAUTHORIZED", "guardApiKey");
    return next(err);
  }
  next();
};

/**
 * Guard routes that require a valid JWT.
 * The User ID is available in req.user.sub
 */
const guardUser = expressjwt({
  secret,
  algorithms,
  credentialsRequired: true,
});

/**
 * Get a user from a valid JWT, but don't require it.
 * The User ID (if any) is available in req.user.sub
 */
const getUser = expressjwt({
  secret,
  algorithms,
  credentialsRequired: false,
});

/**
 * Generates a valid JWT for a user ID.
 * @param {*} userId The user ID.
 * @returns A JWT for the user ID as the sub value.
 */
const signUser = (userId) => jwt.sign({ sub: userId }, secret, expiration);

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
  guardUser,
  getUser,
  signUser,
};

module.exports = security;
