const express = require("express");

const router = express.Router();

router
  .get("/", (req, res) => {
    res.send("All Activities");
  })
  .get("/:id", (req, res) => {
    res.send(`Activity with id ${req.params.id}`);
  })
  .get("/:id/bookings", (req, res) => {
    res.send(`Bookings for Activity with Id ${req.params.id}`);
  })
  .post("/", (req, res) => {
    res.send("Create new Activity");
  })
  .put("/:id", (req, res) => {
    res.send(`Update Activity with Id ${req.params.id}`);
  })
  .delete("/:id", (req, res) => {
    res.send(`Delete Activity with Id ${req.params.id}`);
  });

module.exports = router;
