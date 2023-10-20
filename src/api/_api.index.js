const activitiesRouter = require("./activities.router");
const bookingsRouter = require("./bookings.router");
const credentialsRouter = require("./credentials.router");
const usersRouter = require("./users.router");
const middleware = require("../middleware/_middleware.index");
const { guardUser } = middleware.security;

const configureRoutes = (app, apiVersion) => {
  app.get("/", (req, res) => res.send("Activity Bookings API"));
  app.use(`/v${apiVersion}/activities`, activitiesRouter);
  app.use(`/v${apiVersion}/bookings`, bookingsRouter);
  app.use(`/v${apiVersion}/credentials`, credentialsRouter);
  app.use(`/v${apiVersion}/users`, guardUser, usersRouter);
};

/**
 * Defines main routes for the API, attaching controllers.
 */
const api = { configureRoutes };

module.exports = api;
