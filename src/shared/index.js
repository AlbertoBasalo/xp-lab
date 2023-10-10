const AppError = require("./app-error.class");
const MemoryRepository = require("./memory.repository");
const db = require("./sequelize");

/**
 * Shared models and utilities not related with express
 */
const shared = { AppError, MemoryRepository, db };

module.exports = shared;
