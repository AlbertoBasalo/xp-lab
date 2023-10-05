const error = require("./error.handler");
const logger = require("./logger");
const security = require("./security");

/**
 * Middleware configuration for security, logging, and error handling
 */
const middleware = { error, logger, security };

module.exports = middleware;
