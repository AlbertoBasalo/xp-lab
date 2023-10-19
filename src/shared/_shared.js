const AppError = require("./app-error.class");
const MemoryRepository = require("./memory.repository");

/**
 * Shared models and utilities not related with express
 */
const shared = { AppError, MemoryRepository };

module.exports = shared;
