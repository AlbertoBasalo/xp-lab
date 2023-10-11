const axios = require("axios");
const { USERS, ACTIVITIES } = require("./input.data");
const { REGISTER_URL, USERS_URL, ACTIVITIES_URL, OPTIONS_BASE, LOGIN_URL, BOOKINGS_URL } = require("./api.settings");

/**
 * Main testing flows
 */
const main = async () => {
  const alice = USERS[0];
  const aliceActivities = ACTIVITIES[0];
  const bob = USERS[1];
  const bobActivities = ACTIVITIES[1];
  try {
    await registerUser(alice);
    await registerUser(bob);
    await organizeUserActivities(alice, aliceActivities);
    await organizeUserActivities(bob, bobActivities);
    await organizeAndBookActivity(alice, bob, aliceActivities[0]);
  } catch (err) {
    console.error(err.message, { path: err.request?.path, response: err.response?.data });
  }
};

/** Test cases */

const registerUser = async (user) => {
  const userToken = await getUserToken(user);
  const userOptions = makeUserOptions(userToken.accessToken);
  await unregister(userToken.id, userOptions);
};

const organizeUserActivities = async (organizer, activities) => {
  const userToken = await getUserToken(organizer);
  const userOptions = makeUserOptions(userToken.accessToken);
  const postedResult = await organizeActivities(activities, userOptions);
  await clearUserJourney(postedResult, userOptions, userToken, organizer);
  return true;
};

const organizeAndBookActivity = async (organizer, participant, activity) => {
  const { activityResult, organizerOptions, organizerToken } = await organizeActivity(organizer, activity);
  const { bookingResult, participantOptions, participantToken } = await bookActivity(participant, activityResult.data);
  await clearActivityBookings(activityResult, organizerOptions, bookingResult, participantOptions);
  await unregister(organizerToken.id, organizerOptions);
  await unregister(participantToken.id, participantOptions);
};

/** Helper functions */

const clearActivityBookings = async (activityResult, organizerOptions, bookingResult, participantOptions) => {
  await deleteActivity(activityResult.data.id, organizerOptions);
  await deleteBooking(bookingResult.data.id, participantOptions);
};

const bookActivity = async (participant, activity) => {
  const participantToken = await getUserToken(participant);
  const participantOptions = makeUserOptions(participantToken.accessToken);
  const booking = { activityId: activity.id, participants: 2, status: "confirmed" };
  console.log("Booking to create", booking);
  const bookingResult = await postBooking(booking, participantOptions);
  const retrieved = await getMyBookings(participantOptions);
  const retrievedData = retrieved.data;
  console.log("Booking retrieved", retrievedData);
  return { bookingResult, participantOptions, participantToken };
};

const organizeActivity = async (organizer, activity) => {
  const organizerToken = await getUserToken(organizer);
  const organizerOptions = makeUserOptions(organizerToken.accessToken);
  const activityResult = await postActivity(activity, organizerOptions);
  console.log("Activity created", activityResult.data);
  return { activityResult, organizerOptions, organizerToken };
};

const getUserToken = async (user) => {
  try {
    const response = await register(user);
    console.log(`User ${user.email} registered`, response.data);
    return response.data;
  } catch (err) {
    const response = await login(user);
    console.log(`User ${user.email} logged in`, response.data);
    return response.data;
  }
};
const organizeActivities = async (activities, userOptions) => {
  await Promise.all(activities.map((activity) => postActivity(activity, userOptions)));
  const retrieved = (await getMyActivities(userOptions)).data;
  console.log("Activities retrieved", retrieved);
  return retrieved;
};
const clearUserJourney = async (activitiesResult, userOptions, userToken, user) => {
  await Promise.all(activitiesResult.map((activity) => deleteActivity(activity.id, userOptions)));
  await unregister(userToken.id, userOptions);
  console.log("User journey cleared", user);
};

/** API calls */

const register = async (user) => await axios.post(REGISTER_URL, user, OPTIONS_BASE);
const unregister = async (userId, options) => await axios.delete(`${USERS_URL}/${userId}`, options);
const login = async (user) => await axios.post(LOGIN_URL, user, OPTIONS_BASE);
const postActivity = async (activity, options) => await axios.post(ACTIVITIES_URL, activity, options);
const deleteActivity = async (activityId, options) => await axios.delete(`${ACTIVITIES_URL}/${activityId}`, options);
const getActivities = async () => await axios.get(ACTIVITIES_URL, OPTIONS_BASE);
const getMyActivities = async (options) => await axios.get(`${ACTIVITIES_URL}/mines`, options);
const postBooking = async (booking, options) => await axios.post(BOOKINGS_URL, booking, options);
const deleteBooking = async (bookingId, options) => await axios.delete(`${BOOKINGS_URL}/${bookingId}`, options);
const getMyBookings = async (options) => await axios.get(`${BOOKINGS_URL}`, options);
const makeUserOptions = (token) => ({ headers: { ...OPTIONS_BASE.headers, Authorization: `Bearer ${token}` } });

/**
 * Start tests
 * Execute main function
 **/
main();
