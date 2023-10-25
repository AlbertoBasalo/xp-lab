/**
 * Middleware express functions and configuration for security, logging, and error handling
 */
module.exports = middleware = {
  /** Middleware function to act as a controller for a service function */
  controller: require("./controller.middleware"),
  /** Middleware error handler that logs and responds to any error*/
  errorHandler: require("./error-handler.middleware"),
  /** Middleware functions for automatic and custom logging*/
  logs: require("./logs.middleware"),
  /** Middleware functions for generic security not related with user authentication*/
  security: require("./security.middleware"),
  /** Middleware to validate the request JWT and extracts the UserId */
  authentication: require("./authentication.middleware"),
  /** Middleware to extract arguments from the request.*/
  validations: require("./validations.middleware"),
};
