const assert = require("assert");
const userToken = require("./userToken");
const { postActivity, deleteActivity, getMyActivities, postBooking, deleteBooking } = require("./axios.functions");
const { USERS, ACTIVITIES } = require("./input.data");

const shouldOrganizeActivity = async () => {
  let organizerToken;
  let activityId;
  try {
    organizerToken = await userToken.getUserToken(USERS[0]);
    const activity = ACTIVITIES[0][0];
    const activityResult = await postActivity(activity, organizerToken.options);
    activityId = activityResult.data.id;
    const myActivities = await getMyActivities(organizerToken.userId, organizerToken.options);
    assert.strictEqual(myActivities.data.length, 1);
    console.log("   ✅ shouldOrganizeActivity passed", myActivities.data);
  } catch (error) {
    console.log("   ❌ shouldOrganizeActivity failed" + error.message);
  }
  await afterOrganizeActivity(activityId, organizerToken.options);
};

const afterOrganizeActivity = async (activityId, organizerOptions) => {
  try {
    await deleteActivity(activityId, organizerOptions);
    console.log(" 🧹 afterOrganizeActivity done");
  } catch (error) {
    console.log(" 🐞 " + error.message, activityId, organizerOptions);
  }
};

const shouldBookActivity = async () => {
  let organizerToken;
  let organizerOptions;
  let activityId;
  let participantToken;
  let participantOptions;
  let bookingId;
  try {
    organizerToken = await userToken.getUserToken(USERS[0]);
    organizerOptions = organizerToken.options;
    const activity = ACTIVITIES[0][0];
    const activityResult = await postActivity(activity, organizerOptions);
    activityId = activityResult.data.id;
    participantToken = await userToken.getUserToken(USERS[1]);
    participantOptions = participantToken.options;
    const booking = { activityId };
    const bookingResult = await postBooking(booking, participantOptions);
    bookingId = bookingResult.data.id;
    console.log("   ✅ shouldBookActivity passed");
  } catch (error) {
    console.log("   ❌ shouldBookActivity failed" + error.message);
  }
  await afterBookActivity(activityId, organizerOptions, bookingId, participantOptions);
};

const afterBookActivity = async (activityId, organizerOptions, bookingId, participantOptions) => {
  try {
    await deleteBooking(bookingId, participantOptions);
    await deleteActivity(activityId, organizerOptions);
    console.log(" 🧹 afterBookActivity done");
  } catch (error) {
    console.log(" 🐞 " + error.message, activityId, organizerOptions, bookingId, participantOptions);
  }
};

const happyTests = {
  shouldOrganizeActivity,
  shouldBookActivity,
};

module.exports = happyTests;
