const API_URL = "http://localhost:3000/v1";
const ACTIVITIES_URL = `${API_URL}/activities`;
const BOOKINGS_URL = `${API_URL}/bookings`;
const USERS_URL = `${API_URL}/users`;
const CREDENTIALS_URL = `${API_URL}/credentials`;
const REGISTER_URL = `${CREDENTIALS_URL}/register`;
const LOGIN_URL = `${CREDENTIALS_URL}/login`;
const OPTIONS_BASE = {
  headers: {
    "x-api-key": "xp-client",
  },
};

const urlConfigs = {
  ACTIVITIES_URL,
  API_URL,
  BOOKINGS_URL,
  CREDENTIALS_URL,
  OPTIONS_BASE,
  LOGIN_URL,
  REGISTER_URL,
  USERS_URL,
};

module.exports = urlConfigs;
