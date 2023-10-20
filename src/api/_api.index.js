const activitiesRouter = require("./activities.router");
const bookingsRouter = require("./bookings.router");
const usersRouter = require("./users.router");

const configureRoutes = (app, apiVersion) => {
  app.get("/", (req, res) => res.send("Activity Bookings API"));
  app.use(`/v${apiVersion}/activities`, activitiesRouter);
  app.use(`/v${apiVersion}/bookings`, bookingsRouter);
  app.use(`/v${apiVersion}/users`, usersRouter);
};

/**
 * Defines main routes for the API, attaching controllers.
 */
const api = { configureRoutes };

module.exports = api;
