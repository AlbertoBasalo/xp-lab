const express = require("express");
const activitiesController = require("./activities.controller");

/**
 * Defines the routes for the activities endpoint.
 * Wires each route with its service function.
 */
const router = express.Router();

router
  .get("/", activitiesController.getActivities)
  .get("/:id", activitiesController.getActivity)
  .get("/:id/bookings", activitiesController.getActivityBookings)
  .post("/", activitiesController.postActivity)
  .put("/:id", activitiesController.putActivity)
  .delete("/:id", activitiesController.deleteActivity);

module.exports = router;
