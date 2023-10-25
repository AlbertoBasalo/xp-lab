const { login, register, refresh, unregister, getMyBookings, makeUserOptions } = require("./axios.functions");

const { USERS } = require("./input.data");

const shouldRegister = async () => {
  let userToken;
  try {
    const user = USERS[0];
    await beforeEach(user);
    const response = await register(user);
    userToken = response.data;
    console.log("   ✅ shouldRegister passed");
  } catch (error) {
    console.log("   ❌ shouldRegister failed" + error.message);
  }
  await afterEach(userToken);
};

const shouldNotRegisterTwice = async () => {
  let userToken;
  try {
    const user = USERS[0];
    await beforeEach(user);
    const response = await register(user);
    userToken = response.data;
    const unwantedResponse = await register(user);
    console.log("   ❌ shouldNotRegisterTwice failed", unwantedResponse.data.id);
  } catch (error) {
    console.log("   ✅ shouldNotRegisterTwice passed " + error.response.status);
  }
  await afterEach(userToken);
};

const shouldNotLoginExpired = async () => {
  let userToken;
  try {
    const user = USERS[0];
    await beforeEach(user);
    const response = await register(user);
    userToken = response.data;
    // wait 3 seconds for token to expire
    await new Promise((resolve) => setTimeout(resolve, 3000));
    const unwantedResponse = await getMyBookings(makeUserOptions(userToken.accessToken));
    console.log("   ❌ shouldNotLoginExpired failed", unwantedResponse.data.id);
  } catch (error) {
    console.log("   ✅ shouldNotLoginExpired passed " + error.response.status);
  }
  await afterEach(userToken);
};

const shouldRefreshAfterExpiration = async () => {
  let userToken;
  try {
    const user = USERS[0];
    await beforeEach(user);
    const response = await register(user);
    userToken = response.data;
    // wait 3 seconds for token to expire
    await new Promise((resolve) => setTimeout(resolve, 3000));
    const response2 = await refresh(userToken);
    userToken = response2.data;
    // console.log("   🔎 What refresh returns ", userToken);
    console.log("   ✅ shouldRefreshAfterExpiration passed " + response2.data.id);
  } catch (error) {
    console.log("   ❌ shouldRefreshAfterExpiration failed", error.message);
  }
  await afterEach(userToken);
};

const beforeEach = async (user) => {
  try {
    const response = await login(user);
    const userToken = response.data;
    const userOptions = makeUserOptions(userToken);
    await unregister(userToken.id, userOptions);
    console.log(" 🧹 beforeEach");
  } catch (error) {
    console.log(" 🧹 beforeEach already clean", error.message);
  }
};

const afterEach = async (userToken) => {
  try {
    const userOptions = makeUserOptions(userToken.accessToken);
    await unregister(userToken.id, userOptions);
    console.log(" 🧹 afterEach clean");
  } catch (error) {
    try {
      const response2 = await refresh(userToken);
      const userToken2 = response2.data;
      // console.log("   🔎 What refresh returns ", userToken2);
      const userOptions2 = makeUserOptions(userToken2.accessToken);
      await unregister(userToken2.id, userOptions2);
      console.log(" 🧹 afterEach clean");
    } catch (err) {
      console.log(" 🐞 afterEach: " + error.message, userToken);
    }
  }
};

// ToDo: shouldNotLoginWithWrongPassword

const usersTests = {
  shouldRegister,
  shouldNotRegisterTwice,
  shouldNotLoginExpired,
  shouldRefreshAfterExpiration,
};

module.exports = usersTests;
