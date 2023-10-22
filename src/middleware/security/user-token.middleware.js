const jwt = require("jsonwebtoken");
const { expressjwt } = require("express-jwt");
const { AppError } = require("../../shared/shared.index");
const algorithms = ["HS256"];
const expiration = { expiresIn: "1y" };
const env = require("dotenv").config().parsed;
const secret = env.JWT_SECRET;
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
 * Generates a valid JWT for a user ID.
 * @param {*} userId The user ID (the token payload).
 * @returns A JWT for the user with the ID as the sub value.
 */
const signUser = (userId) => jwt.sign({ sub: userId }, secret, expiration);

const guardIsOwner = (userId, item, source) => {
  if (userId !== item.id) {
    throw new AppError("User is not the owner", "FORBIDDEN", source);
  }
};

/**
 * Security related middleware functions.
 * @description Configures JWT for user identification and API Key guards.
 */
const userToken = {
  guardUser,
  guardIsOwner,
  signUser,
};

module.exports = userToken;
