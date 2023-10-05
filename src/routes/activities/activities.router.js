const express = require("express");
const service = require("./activities.service");
const { control, getId, getBody, security } = require("../../middleware");

/**
 * Defines the routes for the activities endpoint.
 * Wires each route with its service function.
 */
const router = express.Router();

router
  .get("/", control(service.readActivities))
  .get("/:id", getId, control(service.readActivity))
  .get("/:id/bookings", getId, control(service.readActivityBookings))
  .post("/", security.guardUser, getBody, control(service.createActivity))
  .put("/:id", security.guardUser, getId, getBody, control(service.updateActivity))
  .delete("/:id", security.guardUser, getId, control(service.deleteActivity));

module.exports = router;
