const controller = require("./controller/controller.middleware");
const errors = require("./logs/error.handler");
const logs = require("./logs/logs.middleware");
const security = require("./security/security.middleware");
const userToken = require("./security/user-token.middleware");
const validations = require("./controller/validations.middleware");

/**
 * Middleware express functions and configuration for security, logging, and error handling
 */
const middleware = {
  controller,
  errors,
  logs,
  security,
  userToken,
  validations,
};

module.exports = middleware;
