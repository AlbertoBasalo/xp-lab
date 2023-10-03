// routers defines the routes for the activities endpoint
const express = require("express");
const controller = require("./activities.controller");

const router = express.Router();

router
  .get("/", controller.getActivities)
  .get("/:id", controller.getActivity)
  .get("/:id/bookings", controller.getActivityBookings)
  .post("/", controller.postActivity)
  .put("/:id", controller.putActivity)
  .delete("/:id", controller.deleteActivity);

module.exports = router;
