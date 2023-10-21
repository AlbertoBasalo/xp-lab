const activitiesRouter = require("./activities.router");
const bookingsRouter = require("./bookings.router");
const credentialsRouter = require("./credentials.router");
const usersRouter = require("./users.router");
const middleware = require("../middleware/_middleware.index");
const { guardUser } = middleware.security;
const express = require("express");

const useRouters = (app, apiVersion) => {
  app.get("/", (req, res) => res.send("Activity Bookings API"));
  const apiRouter = useApiRouters();
  app.use(`/v${apiVersion}`, apiRouter);
};

const useApiRouters = () => {
  const apiRouter = express.Router();
  apiRouter.use("/activities", activitiesRouter);
  apiRouter.use("/bookings", bookingsRouter);
  apiRouter.use("/credentials", credentialsRouter);
  apiRouter.use("/users", guardUser, usersRouter);
  return apiRouter;
};

/**
 * Defines main routes for the API, attaching controllers.
 */
const api = { useRouters };

module.exports = api;
