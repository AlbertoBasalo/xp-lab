const UserRepository = require("./user.repository");
const ActivityRepository = require("./activity.repository");
const BookingRepository = require("./booking.repository");

module.exports = {
  usersRepository: UserRepository(),
  activitiesRepository: ActivityRepository(),
  bookingsRepository: BookingRepository(),
};
