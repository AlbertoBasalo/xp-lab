const controller = require("./controller/controller");
const errors = require("./logs/errors");
const logs = require("./logs/logs");
const security = require("./security/security");
const validations = require("./controller/validations");

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
