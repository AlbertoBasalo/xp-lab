const AppError = require("./models/app-error.class");
const request = require("./utils/request");
const activitiesRepository = require("./db/activities.repository");
const bookingsRepository = require("./db/bookings.repository");
const usersRepository = require("./db/users.repository");

/**
 * Shared models and utilities
 */
const shared = { AppError, request, activitiesRepository, bookingsRepository, usersRepository };

module.exports = shared;
