const activitiesRouter = require("./activities/activities.router");
const bookingsRouter = require("./bookings/bookings.router");
const jwt = require("jsonwebtoken");

function configure(app, express, apiVersion) {
  app.get("/", (req, res) => res.send("Activity Bookings API"));
  app.get("/token/:userId", (req, res) =>
    res.send(
      jwt.sign({ sub: req.params.userId }, process.env.JWT_SECRET || "secret", {
        expiresIn: "1h",
      })
    )
  );
  app.use(express.json());
  app.use(`/v${apiVersion}/activities`, activitiesRouter);
  app.use(`/v${apiVersion}/bookings`, bookingsRouter);
}

/**
 * Defines main routes for the API, attaching controllers.
 */
const routes = { configure };

module.exports = routes;
