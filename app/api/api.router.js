const activitiesRouter = require("./activities/activities.router");
const bookingsRouter = require("./bookings/bookings.router");
const usersRouter = require("./users/users.router");

function useRouters(app, express, apiVersion) {
  app.get("/", (req, res) => res.send("Activity Bookings API"));
  app.use(express.json());
  app.use(`/v${apiVersion}/activities`, activitiesRouter);
  app.use(`/v${apiVersion}/bookings`, bookingsRouter);
  app.use(`/v${apiVersion}/users`, usersRouter);
}
/**
 * Defines main routes for the API, attaching controllers and middleware.
 */
module.exports = api = {
  /** Configure middleware and sets routes for the API endpoints */
  useRouters,
};
