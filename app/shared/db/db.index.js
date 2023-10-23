/** Db connections and repository clases */
module.exports = db = {
  /** In memory repository for activities */
  activitiesRepository: require("./activities.repository"),
  /** In memory repository for bookings */
  bookingsRepository: require("./bookings.repository"),
  /** In memory repository for users */
  usersRepository: require("./users.repository"),
};
