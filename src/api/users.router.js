const express = require("express");
const middleware = require("../middleware/_middleware.index");
const controller = require("./users.controller");
const service = require("./users.service");

const { control } = middleware.controller;
const { getId, getBody } = middleware.validations;
const { guardUser } = middleware.security;

/**
 * Defines the routes for the users endpoint.
 * Guards some routes requiring a user to be logged in.
 * Adds a middleware to extract args from the request.
 * Wires each route with its service function.
 */
const router = express.Router();

router
  .get("/:id", guardUser, control(service.readById))
  .get("/:id/activities", guardUser, (req, res, next) => res.status(204).send("Not implemented yet"))
  .get("/:id/bookings", guardUser, (req, res, next) => res.status(204).send("Not implemented yet"))
  .post("/", getBody, control(controller.register))
  .post("/register", getBody, control(controller.register))
  .post("/login", getBody, control(controller.login))
  .delete("/:id", guardUser, getId, control(service.deleteById));

module.exports = router;
