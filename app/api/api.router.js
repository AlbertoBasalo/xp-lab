const express = require("express");

const activitiesRouter = require("./activities/activities.router");
const bookingsRouter = require("./bookings/bookings.router");
const credentialsRouter = require("./credentials/credentials.router");
const usersRouter = require("./users/users.router");

const middleware = require("../middleware/middleware.index");
const { guardUser } = middleware.authentication;
const { debugReq } = middleware.logs;
const { hashCredentials } = middleware.security;

const useRouters = (app, apiVersion) => {
  app.use(express.json());
  app.get("/", (req, res) => res.send("Activity Bookings API"));
  const apiRouters = getApiRouters();
  app.use(`/v${apiVersion}`, apiRouters);
};

const getApiRouters = () => {
  const apiRouters = express.Router();
  apiRouters.use("/activities", activitiesRouter);
  apiRouters.use("/bookings", bookingsRouter);
  apiRouters.use("/credentials", hashCredentials, debugReq, credentialsRouter);
  apiRouters.use("/users", guardUser, usersRouter);
  return apiRouters;
};

/**
 * Defines main routes for the API, attaching controllers and middleware.
 */
module.exports = api = {
  /** Configure middleware and sets routes for the API endpoints */
  useRouters,
};
