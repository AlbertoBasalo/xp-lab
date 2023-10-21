const activitiesRepository = require("../activities/activities.repository");
const bookingsRepository = require("../bookings/bookings.repository");

async function readActivities(userId) {
  return await activitiesRepository.selectByKeyValue("userId", userId);
}

async function readBookings(userId) {
  return await bookingsRepository.selectByKeyValue("userId", userId);
}

/**
 * Business logic for Users entities
 * @description should not know about the HTTP layer nor the database layer implementation details
 */
const usersService = {
  readActivities,
  readBookings,
};

module.exports = usersService;
