const cors = require("cors");
const helmet = require("helmet");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { expressjwt } = require("express-jwt");
const { AppError } = require("../shared");

const { parsed: env } = dotenv.config();
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
 * @returns A JWT for the user ID.
 */
const signUser = (userId) => jwt.sign({ sub: userId }, secret, expiration);

const useSecurity = (app) => {
  app.use(cors());
  app.use(helmet());
  app.use(guardApiKey);
};

module.exports = { useSecurity, guardUser, getUser, signUser };
