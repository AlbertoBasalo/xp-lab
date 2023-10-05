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

async function createActivity(activity, userId) {
  activity.userId = userId;
  activity.id = new Date().getTime();
  activity.timestamp = new Date().toISOString();
  return await activitiesRepository.insertActivity(activity);
}

async function updateActivity(id, activity, userId) {
  const current = await readActivity(id);
  validateUser(userId, current, "updateActivity");
  const updated = { ...current, ...activity, timestamp: new Date().toISOString() };
  await activitiesRepository.updateActivity(id, updated);
  return updated;
}

async function deleteActivity(id, userId) {
  const current = await activitiesRepository.selectActivity(id);
  if (!current) return;
  validateUser(userId, current, "deleteActivity");
  return await activitiesRepository.deleteActivity(id);
}

function validateUser(userId, current, source) {
  if (userId !== current.userId) {
    throw new AppError("User is not the owner of the activity", "FORBIDDEN", source);
  }
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
