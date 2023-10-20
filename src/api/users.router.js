const express = require("express");
const middleware = require("../middleware/_middleware.index");
const service = require("./users.service");

const { control } = middleware.controller;

/**
 * Defines the routes for the users endpoint.
 * Guards some routes requiring a user to be logged in.
 * Adds a middleware to extract args from the request.
 * Wires each route with its service function.
 */
const router = express.Router();

router.get("/:id/activities", control(service.readActivities)).get("/:id/bookings", control(service.readBookings));

module.exports = router;
