const shared = require("../../shared/shared.index");
const { db, models, utils } = shared;
const { activitiesRepository, bookingsRepository } = db;
const { AppError } = models;
const { guardIsOwner } = utils.authorization;
const { logger } = utils;

async function readAll() {
  return await activitiesRepository.selectAll();
}

async function readById(id) {
  const activity = await activitiesRepository.selectById(id);
  if (!activity) {
    throw new AppError(`Activity with id: ${id} not found `, "NOT_FOUND", "activities.service.readById");
  }
  return activity;
}

async function readBookings(id, userId) {
  const result = await readById(id);
  const activity = result.dataValues;
  guardIsOwner(userId, activity, "activities.service.readBookings");
  const bookings = await bookingsRepository.selectByKeyValue("activityId", id);
  activity.bookings = bookings;
  return activity;
}

async function create(activity, userId) {
  activity.userId = userId;
  return await activitiesRepository.insert(activity);
}

async function update(id, activity, userId) {
  const result = await readById(id);
  const current = result.dataValues;
  guardIsOwner(userId, current, "activities.service.update");
  const updated = { ...current, ...activity };
  await activitiesRepository.update(id, updated);
  return updated;
}

const deleteById = async (id, userId) => {
  const current = await activitiesRepository.selectById(id);
  if (!current) return;
  guardIsOwner(userId, current, "activities.service.deleteById");
  return await activitiesRepository.deleteById(id);
};

/**
 * Business logic for Activities entities
 * @description should not know about the HTTP layer nor the database layer implementation details
 */
const activitiesService = {
  readAll,
  readById,
  readBookings,
  create,
  update,
  deleteById,
};

module.exports = activitiesService;
