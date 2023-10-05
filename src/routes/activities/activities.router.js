const express = require("express");
const activitiesService = require("./activities.service");
const { getId, getBody, doController } = require("../../shared");

/**
 * Defines the routes for the activities endpoint.
 * Wires each route with its service function.
 */
const router = express.Router();

router
  .get("/", doController(activitiesService.readActivities))
  .get("/:id", doController(activitiesService.readActivity, 200, getId))
  .get("/:id/bookings", doController(activitiesService.readActivityBookings, 200, getId))
  .post("/", doController(activitiesService.createActivity, 201, getBody))
  .put("/:id", doController(activitiesService.updateActivity, 200, getId, getBody))
  .delete("/:id", doController(activitiesService.deleteActivity, 204, getId));

module.exports = router;
