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

const beforeEach = async (user) => {
  try {
    const response = await login(user);
    const userToken = response.data;
    const userOptions = makeUserOptions(userToken.accessToken);
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
      const userOptions2 = makeUserOptions(userToken2.accessToken);
      await unregister(userToken2.id, userOptions2);
      console.log(" 🧹 afterEach clean");
    } catch (err) {
      console.log(" 🐞 afterEach: " + error.message, userToken);
    }
  }
};

// ToDo: shouldLogin

const usersTests = {
  shouldRegister,
};

module.exports = usersTests;
