const express = require("express");
const activitiesService = require("./activities.service");
const { control, getId, getBody } = require("../../middleware");

/**
 * Defines the routes for the activities endpoint.
 * Wires each route with its service function.
 */
const router = express.Router();

router
  .get("/", control(activitiesService.readActivities))
  .get("/:id", getId, control(activitiesService.readActivity))
  .get("/:id/bookings", getId, control(activitiesService.readActivityBookings))
  .post("/", getBody, control(activitiesService.createActivity))
  .put("/:id", getId, getBody, control(activitiesService.updateActivity))
  .delete("/:id", getId, control(activitiesService.deleteActivity));

module.exports = router;
