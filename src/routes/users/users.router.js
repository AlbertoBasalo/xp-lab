const express = require("express");
const service = {}; // ToDo: require("./users.service");
const { control, getBody, guardUser } = require("../../middleware");

/**
 * Defines the routes for the users endpoint.
 * Wires each route with its service function.
 */
const router = express.Router();

router
  //.get("/", control(service.readAll))
  .get("/:id", guardUser, control(service.readById))
  .post("/", getBody, control(service.create))
  .put("/:id", guardUser, getBody, control(service.update))
  .delete("/:id", guardUser, control(service.remove));

module.exports = router;
