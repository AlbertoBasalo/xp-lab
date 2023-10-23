const { expressjwt } = require("express-jwt");
const env = require("dotenv").config().parsed;
const secret = env.JWT_SECRET;
const algorithms = [env.JWT_ALGORITHM];

const guardUser = expressjwt({
  secret,
  algorithms,
  credentialsRequired: true,
});

/**
 * Security related middleware functions.
 * @description Configures JWT for user identification and API Key guards.
 */
const userToken = {
  /**
   * Guard routes that require a valid JWT.
   * The User ID is available in req.user.sub
   */
  guardUser,
};

module.exports = userToken;
