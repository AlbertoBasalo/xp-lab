const activitiesRouter = require("./activities/activities.router");
const bookingsRouter = require("./bookings/bookings.router");
const credentialsRouter = require("./credentials/credentials.router");
const usersRouter = require("./users/users.router");
const middleware = require("../middleware/middleware.index");
const { guardUser } = middleware.userToken;
const { debugReq } = middleware.logs;
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
  apiRouter.use("/credentials", debugReq, credentialsRouter);
  apiRouter.use("/users", guardUser, usersRouter);
  return apiRouter;
};

/**
 * Defines main routes for the API, attaching controllers.
 */
const api = { useRouters };

module.exports = api;
