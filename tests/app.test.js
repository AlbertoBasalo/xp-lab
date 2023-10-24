const userTest = require("./user.test");
const happyTest = require("./happy.test");

const describeUsersTests = async () => {
  console.log("🧪 Users Tests");
  await userTest.shouldRegister();
  await userTest.shouldNotRegisterTwice();
  await userTest.shouldNotLoginExpired();
  await userTest.shouldRefreshAfterExpiration();
};
const describeHappyTests = async () => {
  console.log("🧪 Happy Tests");
  await happyTest.shouldOrganizeActivity();
  await happyTest.shouldBookActivity();
};

const main = async () => {
  await describeUsersTests();
  await describeHappyTests();
};

main();

const { register, postActivity, deleteActivity, getActivity, makeUserOptions } = require("./axios.functions");
const { USERS, ACTIVITIES } = require("./input.data");

async function forceUnauthorized() {
  await postActivity(ACTIVITIES[0][0], OPTIONS_BASE);
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

const expectedError = (err) => console.log(`Expected Error: ${err.response.status}, ${err.response.data.message}`);
const expectedResult = (res) => console.log(`Expected Result: ${res.status}, ${res.data.length || 1} items`);
const logError = (err) => console.error(`UN - Expected Error: ${err.message}`, err.request.path);
