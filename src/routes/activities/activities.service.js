const activitiesRepository = require("./activities.memory.repository");
const bookingsRepository = require("../bookings/bookings.memory.repository");
const { AppError } = require("../../shared");

async function readActivities() {
  return await activitiesRepository.selectActivities();
}

async function readActivity(id) {
  const activity = await activitiesRepository.selectActivity(id);
  if (!activity) {
    throw new AppError(`Activity with id: ${id} not found `, "NOT_FOUND", "readActivity");
  }
  return activity;
}

async function readActivityBookings(id) {
  await readActivity(id);
  return await bookingsRepository.selectBookingByActivityId(id);
}

async function createActivity(activity, user) {
  activity.user = user;
  activity.id = new Date().getTime();
  activity.timestamp = new Date().toISOString();
  return await activitiesRepository.insertActivity(activity);
}

async function updateActivity(id, activity) {
  const current = await readActivity(id);
  const updated = { ...current, ...activity, timestamp: new Date().toISOString() };
  await activitiesRepository.updateActivity(id, updated);
  return updated;
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
