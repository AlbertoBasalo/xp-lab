const controller = require("./controller");
const errors = require("./errors");
const logs = require("./logs");
const security = require("./security");
const validations = require("./validations");

/**
 * Middleware express functions and configuration for security, logging, and error handling
 */
const middleware = {
  controller,
  errors,
  logs,
  security,
  validations,
};

module.exports = middleware;
