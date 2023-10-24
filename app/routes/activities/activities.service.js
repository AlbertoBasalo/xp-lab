const { AppError, db } = require("../../shared/shared.index");

const activitiesRepository = db.activities;
const bookingsRepository = db.bookings;

async function readAll() {
  return await activitiesRepository.selectAll();
}

async function readById(id) {
  const activity = await activitiesRepository.selectById(id);
  if (!activity) {
    throw new AppError(`Activity ${id} not found `, "NOT_FOUND", "readActivity");
  }
  return activity;
}
async function readByUser(userId) {
  return await activitiesRepository.selectByUserId(userId);
}

async function readBookings(id, userId) {
  const current = await readById(id);
  validateUser(userId, current, "readBookings");
  return await bookingsRepository.selectByActivityId(id);
}

async function create(activity, userId) {
  activity.userId = userId;
  return await activitiesRepository.insert(activity);
}

async function update(id, activity, userId) {
  const current = await readById(id);
  validateUser(userId, current, "updateActivity");
  const updated = { ...current, ...activity };
  await activitiesRepository.update(id, updated);
  return updated;
}

const deleteById = async (id, userId) => {
  const current = await activitiesRepository.selectById(id);
  if (!current) return;
  validateUser(userId, current, "deleteActivity");
  return await activitiesRepository.deleteById(id);
};

function validateUser(userId, current, source) {
  if (userId !== current.userId) {
    throw new AppError(`User ${userId} is not the owner of Activity ${current.id}`, "FORBIDDEN", source);
  }
}

/**
 * Business logic for Activities entities
 * @description should not know about the HTTP layer nor the database layer implementation details
 */
const activitiesService = {
  readAll,
  readById,
  readByUser,
  readBookings,
  create,
  update,
  deleteById,
};

module.exports = activitiesService;