const AppError = require("./models/app-error.class");
const request = require("./utils/request");
const MemoryRepository = require("./db/memory.repository");

/**
 * Shared models and utilities
 */
const shared = { AppError, MemoryRepository, request };

module.exports = shared;
