const { AppError, db } = require("../../shared/shared.index");

const activitiesRepository = db.activities;
const bookingsRepository = db.bookings;

async function readAll(userId) {
  return await bookingsRepository.selectByUserId(userId);
}

async function readById(id, userId) {
  const booking = await bookingsRepository.selectById(id);
  if (!booking) {
    throw new AppError(`Booking ${id} not found `, "NOT_FOUND", "readBooking");
  }
  if (userId !== booking.userId) {
    throw new AppError(`User ${userId} is not the owner of the booking ${id}`, "FORBIDDEN", "readBooking");
  }
  return booking;
}

async function readActivity(id, userId) {
  const booking = await readById(id, userId);
  return await activitiesRepository.selectById(booking.activityId);
}

create = async (booking, userId) => {
  const activity = activitiesRepository.selectById(booking.activityId);
  if (!activity) throw new AppError(`Activity ${booking.activityId} not found`, "NOT_FOUND", "createBooking");
  booking.userId = userId;
  // booking.activityId = activity.id;
  console.log(booking);
  return await bookingsRepository.insert(booking);
};

async function update(id, booking, userId) {
  const current = await readById(id, userId);
  const updated = { ...current, ...booking };
  await bookingsRepository.update(id, updated);
  return updated;
}

const deleteById = async (id, userId) => {
  const current = await bookingsRepository.selectById(id);
  if (!current) return;
  if (userId !== current.userId) {
    throw new AppError(`User ${userId} is not the owner of the Booking ${id}`, "FORBIDDEN", "deleteBooking");
  }
  return await bookingsRepository.deleteById(id);
};

/**
 * Business logic for Activities entities
 * @description should not know about the HTTP layer nor the database layer implementation details
 */
const bookingsService = {
  readAll,
  readById,
  readActivity,
  create,
  update,
  deleteById,
};

module.exports = bookingsService;
