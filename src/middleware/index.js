const { handleErrors } = require("./error.handler");
const logger = require("./logger");
const { useSecurity, guardUser, getUser, signUser } = require("./security");
const { control, getId, getBody } = require("./controller");

/**
 * Middleware functions and configuration for security, logging, and error handling
 */
const middleware = { control, getId, getBody, handleErrors, logger, useSecurity, guardUser, getUser, signUser };

module.exports = middleware;
