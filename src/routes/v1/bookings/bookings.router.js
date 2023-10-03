const express = require("express");

const router = express.Router();

router
  .get("/", (req, res) => {
    res.send("All Bookings");
  })
  .get("/:id", (req, res) => {
    res.send(`Booking with id ${req.params.id}`);
  })
  .post("/", (req, res) => {
    res.send("Create new Booking");
  })
  .put("/:id", (req, res) => {
    res.send(`Update Booking with Id ${req.params.id}`);
  })
  .delete("/:id", (req, res) => {
    res.send(`Delete Booking with Id ${req.params.id}`);
  });

module.exports = router;
