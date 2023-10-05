const activitiesRouter = require("./activities/activities.router");
const bookingsRouter = require("./bookings/bookings.router");

function configure(app, express, apiVersion) {
  app.get("/", (req, res) => res.send("Activity Bookings API"));
  app.use(express.json());
  app.use(`/v${apiVersion}/activities`, activitiesRouter);
  app.use(`/v${apiVersion}/bookings`, bookingsRouter);
}

/**
 * Defines main routes for the API, attaching controllers.
 */
const routes = { configure };

module.exports = routes;
