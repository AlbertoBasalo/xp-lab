const { register, login, makeUserOptions } = require("./axios.functions");

const getUserToken = async (user) => {
  let response;
  try {
    response = await register(user);
  } catch (error) {
    response = await login(user);
  }
  const options = makeUserOptions(response.data.accessToken);
  const userToken = { userId: response.data.id, options };
  return userToken;
};

module.exports = { getUserToken };
