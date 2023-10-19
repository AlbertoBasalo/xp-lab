const axios = require("axios");
const { USERS, ACTIVITIES } = require("./input.data");
const { REGISTER_URL, USERS_URL, ACTIVITIES_URL, OPTIONS_BASE, LOGIN_URL, BOOKINGS_URL } = require("./api.settings");

const organizeUserActivities = async (organizer, activities) => {
  const userToken = await getUserToken(organizer);
  const userOptions = makeUserOptions(userToken.accessToken);
  const postedResult = await organizeActivities(activities, userOptions);
  await clearUserJourney(postedResult, userOptions, userToken, organizer);
  return true;
};

const organizeAndBookActivity = async (organizer, participant, activity) => {
  const { activityResult, organizerOptions, organizerToken } = await organizeActivity(organizer, activity);
  const { bookingResult, participantOptions, participantToken } = await bookActivity(participant, activity);
  await clearOrganizeAndBook(
    activityResult,
    organizerOptions,
    organizerToken,
    bookingResult,
    participantOptions,
    participantToken
  );
};

async function clearOrganizeAndBook(
  activityResult,
  organizerOptions,
  organizerToken,
  bookingResult,
  participantOptions,
  participantToken
) {
  await deleteActivity(activityResult.data.id, organizerOptions);
  await unregister(organizerToken.id, organizerOptions);
  await deleteBooking(bookingResult.data.id, participantOptions);
  await unregister(participantToken.id, participantOptions);
}

async function bookActivity(participant, activity) {
  const participantToken = await getUserToken(participant);
  const participantOptions = makeUserOptions(participantToken.accessToken);
  const booking = { activityId: activity.id, participants: 2, status: "confirmed" };
  const bookingResult = await postBooking(booking, participantOptions);
  const retrieved = await getMyBookings(participantOptions);
  const retrievedData = retrieved.data;
  console.log("Booking retrieved", retrievedData);
  return { bookingResult, participantOptions, participantToken };
}

async function organizeActivity(organizer, activity) {
  const organizerToken = await getUserToken(organizer);
  const organizerOptions = makeUserOptions(organizerToken.accessToken);
  const activityResult = await postActivity(activity, organizerOptions);
  console.log("Activity created", activityResult.data);
  return { activityResult, organizerOptions, organizerToken };
}

async function getUserToken(user) {
  try {
    const response = await register(user);
    console.log("User registered", response.data);
    return response.data;
  } catch (err) {
    const response = await login(user);
    console.log("User logged", response.data);
    return response.data;
  }
}
async function organizeActivities(activities, userOptions) {
  await Promise.all(activities.map((activity) => postActivity(activity, userOptions)));
  const retrieved = (await getMyActivities(userOptions)).data;
  console.log("User data retrieved", retrieved);
  return retrieved;
}
async function clearUserJourney(activitiesResult, userOptions, userToken, user) {
  await Promise.all(activitiesResult.map((activity) => deleteActivity(activity.id, userOptions)));
  await unregister(userToken.id, userOptions);
  console.log("User journey cleared", user);
}

async function forceUnauthorized() {
  await postActivity(ACTIVITIES[0], OPTIONS_BASE);
}

async function forceForbidden() {
  const organizerToken = await getUserToken(USERS[0]);
  const organizerOptions = makeUserOptions(organizerToken.accessToken);
  const activityResult = await postActivity(ACTIVITIES[0][0], organizerOptions);
  console.log("Activity created for delete forbidden use case", activityResult.data);
  const otherToken = await getUserToken(USERS[1]);
  const otherOptions = makeUserOptions(otherToken.accessToken);
  console.log("Other user token", otherToken);
  await deleteActivity(activityResult.data.id, otherOptions);
}

async function forceRegisterConflict() {
  await register(USERS[0]);
  await register(USERS[0]);
}

async function forceNotFound() {
  await getActivity(999999, OPTIONS_BASE);
}

const register = async (user) => await axios.post(REGISTER_URL, user, OPTIONS_BASE);
const unregister = async (userId, options) => await axios.delete(`${USERS_URL}/${userId}`, options);
const login = async (user) => await axios.post(LOGIN_URL, user, OPTIONS_BASE);
const postActivity = async (activity, options) => await axios.post(ACTIVITIES_URL, activity, options);
const deleteActivity = async (activityId, options) => await axios.delete(`${ACTIVITIES_URL}/${activityId}`, options);
const getActivities = async () => await axios.get(ACTIVITIES_URL, OPTIONS_BASE);
const getActivity = async (activityId) => await axios.get(`${ACTIVITIES_URL}/${activityId}`, OPTIONS_BASE);
const getMyActivities = async (options) => await axios.get(`${ACTIVITIES_URL}/mines`, options);
const postBooking = async (booking, options) => await axios.post(BOOKINGS_URL, booking, options);
const deleteBooking = async (bookingId, options) => await axios.delete(`${BOOKINGS_URL}/${bookingId}`, options);
const getMyBookings = async (options) => await axios.get(`${BOOKINGS_URL}`, options);

const makeUserOptions = (token) => ({ headers: { ...OPTIONS_BASE.headers, Authorization: `Bearer ${token}` } });
const expectedError = (err) => console.log(`Expected Error: ${err.response.status}, ${err.response.data.message}`);
const expectedResult = (res) => console.log(`Expected Result: ${res.status}, ${res.data.length || 1} items`);
const logError = (err) => console.error(`UN - Expected Error: ${err.message}`, err.request.path);

/**
 * Main testing flows
 */
happyFlows = async () => {
  const alice = USERS[0];
  const aliceActivities = ACTIVITIES[0];
  const bob = USERS[1];
  const bobActivities = ACTIVITIES[1];
  try {
    await organizeUserActivities(alice, aliceActivities);
    await organizeUserActivities(bob, bobActivities);
    await organizeAndBookActivity(alice, bob, aliceActivities[0]);
  } catch (err) {
    logError(err);
  }
};

forceFailures = async () => {
  try {
    await forceUnauthorized();
  } catch (err) {
    console.info(err.message, { path: err.request?.path, response: err.response?.data });
  }
  try {
    await forceRegisterConflict();
  } catch (err) {
    console.info(err.message, { path: err.request?.path, response: err.response?.data });
  }
  try {
    await forceNotFound();
  } catch (err) {
    console.info(err.message, { path: err.request?.path, response: err.response?.data });
  }
  try {
    await forceForbidden();
  } catch (err) {
    console.info(err.message, { path: err.request?.path, response: err.response?.data });
  }
};

/** Start tests */
// happyFlows();
forceFailures();