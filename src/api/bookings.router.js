const express = require("express");
const middleware = require("../middleware/_middleware.index");
const service = require("./bookings.service");

const { control } = middleware.controller;
const { getId, getBody } = middleware.validations;
const { guardUser } = middleware.security;

/**
 * Defines the routes for the bookings endpoint.
 * Guards some routes requiring a user to be logged in.
 * Adds a middleware to extract args from the request.
 * Wires each route with its service function.
 */
const router = express.Router();

router
  .get("/", guardUser, control(service.readAll))
  .get("/:id", guardUser, getId, control(service.readById))
  .get("/:id/activity", guardUser, getId, control(service.readActivity))
  .post("/", guardUser, getBody, control(service.create))
  .put("/:id", guardUser, getId, getBody, control(service.update))
  .delete("/:id", guardUser, getId, control(service.deleteById));

module.exports = router;
