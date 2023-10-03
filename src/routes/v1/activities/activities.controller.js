function getActivities(req, res) {
  res.send("All Activities");
}
function getActivity(req, res) {
  const { id } = req.params;
  if (id === "666") {
    res.status(404).send("Activity not found");
    return;
  }
  res.send(`Activity with id ${id}`);
}
function getActivityBookings(req, res) {
  const { id } = req.params;
  res.send(`Bookings for Activity with Id ${id}`);
}
function createActivity(req, res) {
  res.send("Create new Activity");
}
function updateActivity(req, res) {
  const { id } = req.params;
  res.send(`Update Activity with Id ${id}`);
}
function deleteActivity(req, res) {
  const { id } = req.params;
  res.send(`Delete Activity with Id ${id}`);
}

module.exports = {
  getActivities,
  getActivity,
  getActivityBookings,
  createActivity,
  updateActivity,
  deleteActivity,
};
