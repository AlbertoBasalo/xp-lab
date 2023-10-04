const ACTIVITIES = require("../../../db/activities.data.json");

async function selectActivities() {
  return ACTIVITIES;
}
async function selectActivity(id) {
  return ACTIVITIES.find((activity) => activity.id == id);
}

async function insertActivity(activity) {
  ACTIVITIES.push(activity);
  return activity;
}

async function updateActivity(id, activity) {
  const index = ACTIVITIES.findIndex((activity) => activity.id == id);
  if (index < 0) {
    return undefined;
  }
  ACTIVITIES[index] = activity;
  return ACTIVITIES[index];
}

async function deleteActivity(id) {
  const index = ACTIVITIES.findIndex((activity) => activity.id == id);
  if (index < 0) {
    return;
  }
  ACTIVITIES.splice(index, 1);
}

/**
 * Data persistance for Activity records
 * @description Specific for in memory database
 */
const activitiesRepository = {
  selectActivities,
  selectActivity,
  insertActivity,
  updateActivity,
  deleteActivity,
};

module.exports = activitiesRepository;
