const express = require("express");
const controller = require("./activities.controller");

const router = express.Router();

router
  .get("/", controller.getActivities)
  .get("/:id", controller.getActivity)
  .post("/", controller.createActivity)
  .put("/:id", controller.updateActivity)
  .delete("/:id", controller.deleteActivity);

module.exports = router;
