const activitiesRepository = require("./activities.memory.repository");
const bookingsRepository = require("../bookings/bookings.memory.repository");
async function readActivities() {
  return await activitiesRepository.selectActivities();
}

async function readActivity(id) {
  return await activitiesRepository.selectActivity(id);
}

async function readActivityBookings(id) {
  const activity = await activitiesRepository.selectActivity(id);
  // ToDo: Use custom errors
  if (!activity) {
    throw new Error(`Activity with id: ${id} not found `);
  }
  return await bookingsRepository.selectBookingByActivityId(id);
}

async function createActivity(activity) {
  return await activitiesRepository.insertActivity(activity);
}

async function updateActivity(id, activity) {
  return await activitiesRepository.updateActivity(id, activity);
}

async function deleteActivity(id) {
  return await activitiesRepository.deleteActivity(id);
}
/**
 * Business logic for Activities entities
 * @description should not know about the HTTP layer nor the database layer implementation details
 */
const activitiesService = {
  readActivities,
  readActivity,
  readActivityBookings,
  createActivity,
  updateActivity,
  deleteActivity,
};

module.exports = activitiesService;
