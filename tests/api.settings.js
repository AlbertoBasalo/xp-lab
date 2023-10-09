const API_URL = "http://localhost:3000/v1";
const ACTIVITIES_URL = `${API_URL}/activities`;
const BOOKINGS_URL = `${API_URL}/bookings`;
const USERS_URL = `${API_URL}/users`;
const REGISTER_URL = `${USERS_URL}/register`;
const LOGIN_URL = `${USERS_URL}/login`;
const OPTIONS_BASE = {
  headers: {
    "x-api-key": "xp-client",
  },
};

const urlConfigs = {
  API_URL,
  ACTIVITIES_URL,
  BOOKINGS_URL,
  USERS_URL,
  REGISTER_URL,
  LOGIN_URL,
  OPTIONS_BASE,
};

module.exports = urlConfigs;
