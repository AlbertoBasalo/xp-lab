const BOOKINGS = require("../../db/bookings.data.json");

async function selectBookings() {
  return BOOKINGS;
}
async function selectBooking(id) {
  return BOOKINGS.find((booking) => booking.id == id);
}

async function selectBookingByActivityId(id) {
  return BOOKINGS.filter((booking) => booking.activityId == id);
}

async function insertBooking(booking) {
  BOOKINGS.push(booking);
}

async function updateBooking(id, booking) {
  const index = BOOKINGS.findIndex((booking) => booking.id == id);
  if (index < 0) {
    return undefined;
  }
  BOOKINGS[index] = booking;
  return BOOKINGS[index];
}

async function deleteBooking(id) {
  const index = BOOKINGS.findIndex((booking) => booking.id == id);
  if (index < 0) {
    return;
  }
  BOOKINGS.splice(index, 1);
}

/**
 * Data persistance for Booking records
 * @description Specific for in memory database
 */
const bookingsRepository = {
  selectBookings,
  selectBooking,
  selectBookingByActivityId,
  insertBooking,
  updateBooking,
  deleteBooking,
};

module.exports = bookingsRepository;
