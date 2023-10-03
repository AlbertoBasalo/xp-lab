// Repository for a specific database

const ACTIVITIES = [
  {
    id: 1,
    name: "Snorkeling",
    description: "Swim with the fishes",
    price: 100,
    quorum: 1,
    capacity: 20,
  },
  {
    id: 2,
    name: "Stand-up Paddleboard",
    description: "Stand on a board and paddle",
    price: 200,
    quorum: 2,
    capacity: 10,
  },
  {
    id: 3,
    name: "Diving'",
    description: "Dive deep into the ocean",
    price: 300,
    quorum: 3,
    capacity: 6,
  },
];

async function selectActivities() {
  return ACTIVITIES;
}
async function selectActivity(id) {
  return ACTIVITIES.find((activity) => activity.id == id);
}
async function selectActivityBookings(id) {
  const activity = selectActivity(id);
  if (!activity) {
    return undefined;
  }
  return ACTIVITIES.find((activity) => activity.id == id).bookings;
}

async function insertActivity(activity) {
  ACTIVITIES.push(activity);
}

async function updateActivity(id, activity) {
  const index = ACTIVITIES.findIndex((activity) => activity.id == id);
  if (index < 0) {
    throw new Error(`Activity with id: ${id} not found`);
  }
  ACTIVITIES[index] = activity;
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
  selectActivityBookings,
  insertActivity,
  updateActivity,
  deleteActivity,
};

module.exports = activitiesRepository;
