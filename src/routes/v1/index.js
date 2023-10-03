const activitiesRouter = require("./activities/activities.router");
const bookingsRouter = require("./bookings/bookings.router");

function configure(app) {
  const version = "1";
  app.use(`/v${version}/activities`, activitiesRouter);
  app.use(`/v${version}/bookings`, bookingsRouter);
}

module.exports = { configure };
