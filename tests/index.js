const axios = require("axios");
const API_URL = "http://localhost:3000/v1";
const ACTIVITIES_URL = `${API_URL}/activities`;
const USERS_URL = `${API_URL}/users`;
const LOGIN_URL = `${USERS_URL}/login`;
const REGISTER_URL = `${USERS_URL}/register`;

const OPTIONS_BASE = {
  headers: {
    "x-api-key": "xp-client",
  },
};

const USERS = [
  {
    name: "Alice Wonderland",
    email: "alice@wonderland.com",
    passwordB: "12345678",
  },
];
const ACTIVITIES = [
  {
    name: "Snorkeling",
    description: "Swim with the fishes",
    price: 100,
    quorum: 1,
    capacity: 20,
  },
  {
    name: "Stand-up Paddleboard",
    description: "Stand on a board and paddle",
    price: 200,
    quorum: 2,
    capacity: 10,
  },
  {
    name: "Diving'",
    description: "Dive deep into the ocean",
    price: 300,
    quorum: 3,
    capacity: 6,
  },
];
const tokens = [];

const register = async (user) => await axios.post(REGISTER_URL, user, OPTIONS_BASE);
const postActivity = async (activity, options) => await axios.post(ACTIVITIES_URL, activity, options);
const getActivities = async () => await axios.get(ACTIVITIES_URL, OPTIONS_BASE);

main = async () => {
  await firstUserHappyJourney();
  await firstUserRiskyJourney();
  await secondUserHappyJourney();
};
main();

async function firstUserHappyJourney() {
  tokens.push((await register(USERS[0])).data);
  await postActivity(ACTIVITIES[0], makeUserOptions(0)).then(logResult);
  await postActivity(ACTIVITIES[1], makeUserOptions(0)).then(logResult);
  await getActivities().then(logResult);
}

async function firstUserRiskyJourney() {
  await register(USERS[0]).catch(logError);
}

async function secondUserHappyJourney() {
  tokens.push((await register(USERS[1])).data);
  await postActivity(ACTIVITIES[2], makeUserOptions(0)).then(logResult);
  await getActivities().then(logResult);
}

function makeUserOptions(id) {
  return { headers: { ...OPTIONS_BASE.headers, Authorization: `Bearer ${tokens[id]}` } };
}
function logError(err) {
  console.log(`Expected Error: ${err.response.status}, ${err.response.data.message}`);
}
function logResult(res) {
  const dataLength = res.data.length || 1;
  console.log(`Expected Result: ${res.status}, ${dataLength} items`);
}
