const AppError = require("./app-error.class");
const request = require("./request");
const MemoryRepository = require("./memory.repository");

/**
 * Shared models and utilities not related with express
 */
const shared = { AppError, MemoryRepository, request };

module.exports = shared;
