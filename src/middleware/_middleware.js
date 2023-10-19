const errors = require("./errors");
const logs = require("./logs");
const security = require("./security");
const validations = require("./validations");
const controller = require("./controller");

/**
 * Middleware express functions and configuration for security, logging, and error handling
 */
const middleware = {
  errors,
  controller,
  validations,
  logs,
  security,
};

module.exports = middleware;
