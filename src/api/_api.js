const activitiesRouter = require("./activities.router");
const bookingsRouter = require("./bookings.router");
const usersRouter = require("./users.router");

const configureApiRoutes = (app, express, apiVersion) => {
  app.get("/", (req, res) => res.send("Activity Bookings API"));
  app.use(express.json());
  app.use(`/v${apiVersion}/activities`, activitiesRouter);
  app.use(`/v${apiVersion}/bookings`, bookingsRouter);
  app.use(`/v${apiVersion}/users`, usersRouter);
};

/**
 * Defines main routes for the API, attaching controllers.
 */
const apiRoutes = { configureApiRoutes };

module.exports = apiRoutes;
