const { login, register, unregister, makeUserOptions } = require("./axios.functions");

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
    console.log("   ❌ shouldNotRegisterTwice failed" + unwantedResponse.data);
  } catch (error) {
    console.log("   ✅ shouldNotRegisterTwice passed");
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
    console.log(" 🐞 afterEach: " + error.message, userToken);
  }
};

// ToDo: shouldLogin
// ToDo: shouldNotLoginWithWrongPassword

const usersTests = {
  shouldRegister,
  shouldNotRegisterTwice,
};

module.exports = usersTests;
