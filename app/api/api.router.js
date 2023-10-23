const express = require("express");

const activitiesRouter = require("./activities/activities.router");
const bookingsRouter = require("./bookings/bookings.router");
const credentialsRouter = require("./credentials/credentials.router");
const usersRouter = require("./users/users.router");
const middleware = require("../middleware/middleware.index");
const { guardUser } = middleware.userToken;
const { debugReq } = middleware.logs;

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
  apiRouters.use("/credentials", debugReq, credentialsRouter);
  apiRouters.use("/users", guardUser, usersRouter);
  return apiRouters;
};

/**
 * Defines main routes for the API, attaching controllers.
 */
const api = {
  /** Configures and sert routes for the API endpoints */
  useRouters,
};

module.exports = api;
