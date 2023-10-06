const express = require("express");
const service = require("./activities.service");
const { control, getId, getBody, guardUser } = require("../../middleware");

/**
 * Defines the routes for the activities endpoint.
 * Guards some routes requiring a user to be logged in.
 * Adds a middleware to extract args from the request.
 * Wires each route with its service function.
 */
const router = express.Router();

router
  .get("/", control(service.readAll))
  .get("/:id", getId, control(service.readById))
  .get("/:id/bookings", guardUser, getId, control(service.readBookings))
  .post("/", guardUser, getBody, control(service.create))
  .put("/:id", guardUser, getId, getBody, control(service.update))
  .delete("/:id", guardUser, getId, control(service.deleteById));

module.exports = router;
