const service = require("./users.service");
const { AppError } = require("../shared/_shared.index");
const { signUser } = require("../middleware/_middleware.index").security;

const register = async (user) => {
  await service.create(user);
  return getUserToken(user);
};

const login = async (credentials) => {
  const user = await service.readByEmail(credentials.email);
  if (user && user.password === credentials.password) {
    return getUserToken(user);
  }
  throw new AppError("Invalid credentials", "FORBIDDEN", "users.controller.login");
};

const getUserToken = (user) => {
  return {
    accessToken: signUser(user.id),
    id: user.id,
  };
};

const usersController = {
  register,
  login,
};

module.exports = usersController;
