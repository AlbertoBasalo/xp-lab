const error = require("./error.handler");
const logger = require("./logger");
const security = require("./security");
const { control, getId, getBody } = require("./controller");

/**
 * Middleware configuration for security, logging, and error handling
 */
const middleware = { control, getId, getBody, error, logger, security };

module.exports = middleware;
