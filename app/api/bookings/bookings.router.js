const express = require("express");
const middleware = require("../../middleware/middleware.index");
const service = require("./bookings.service");

const { control } = middleware.controller;
const { getId, getUserId, getBody } = middleware.validations;
const { guardUser } = middleware.authentication;

/**
 * Defines the routes for the bookings endpoint.
 * Guards some routes requiring a user to be logged in.
 * Adds a middleware to extract args from the request.
 * Wires each route with its service function.
 */
module.exports = express
  .Router()
  .get("/", guardUser, getUserId, control(service.readAll))
  .get("/:id", guardUser, getId, getUserId, control(service.readById))
  .get("/:id/activity", guardUser, getId, getUserId, control(service.readActivity))
  .post("/", guardUser, getBody, getUserId, control(service.create))
  .put("/:id", guardUser, getId, getBody, getUserId, control(service.update))
  .delete("/:id", guardUser, getId, getUserId, control(service.deleteById));
