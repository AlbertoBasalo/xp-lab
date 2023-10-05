const express = require("express");
const activitiesRouter = require("./activities/activities.router");
const bookingsRouter = require("./bookings/bookings.router");

function configure(app) {
  app.get("/", (req, res) => res.send("Activity Bookings API"));
  app.use(express.json());
  const version = "1";
  app.use(`/v${version}/activities`, activitiesRouter);
  app.use(`/v${version}/bookings`, bookingsRouter);
}

module.exports = { configure };
