const controller = require("./controller.middleware");
const errors = require("./error.handler");
const logs = require("./logs.middleware");
const security = require("./security.middleware");
const userToken = require("./user-token.middleware");
const validations = require("./validations.middleware");

/**
 * Middleware express functions and configuration for security, logging, and error handling
 */
const middleware = {
  /** Middleware function to act as a controller for a service function */
  controller,
  /** Middleware error handler that logs and responds to any error*/
  errors,
  /** Middleware functions for automatic and custom logging*/
  logs,
  /** Middleware functions for generic security not related with user authentication*/
  security,
  /** Middleware to validate the request JWT and extracts the UserId */
  userToken,
  /** Middleware to extract arguments from the request.*/
  validations,
};

module.exports = middleware;
