const express = require("express");
const middleware = require("../../middleware");
const service = require("./activities.service");

const { control } = middleware.controller;
const { getId, getBody } = middleware.validations;
const { guardUser } = middleware.security;

/**
 * Defines the routes for the activities endpoint.
 * Guards some routes requiring a user to be logged in.
 * Adds a middleware to extract args from the request.
 * Wires each route with its service function.
 */
const router = express.Router();

router
  .get("/", control(service.readAll))
  .get("/mines", guardUser, control(service.readByUser))
  .get("/:id", getId, control(service.readById))
  .get("/:id/bookings", guardUser, getId, control(service.readBookings))
  .post("/", guardUser, getBody, control(service.create))
  .put("/:id", guardUser, getId, getBody, control(service.update))
  .delete("/:id", guardUser, getId, control(service.deleteById));

module.exports = router;
