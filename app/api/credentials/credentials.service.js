const shared = require("../../shared/shared.index");
const { db, models, utils } = shared;
const { usersRepository } = db;
const { AppError } = models;
const { signUser, guardIsOwner, extractUserId } = utils.authorization;
const { logger } = utils;

const readById = async (id, userId) => {
  const current = await usersRepository.selectById(id);
  if (!current) throw new AppError(`User with id: ${id} not found `, "NOT_FOUND", "credentials.service.readById");
  guardIsOwner(userId, current, "credentials.service.readById");
  return current;
};

const register = async (user) => {
  const createdUser = await create(user);
  return getUserToken(createdUser);
};

const login = async (credentials) => {
  const user = await readByEmail(credentials.email);
  if (user && user.password === credentials.password) {
    return getUserToken(user);
  }
  throw new AppError("Invalid credentials", "FORBIDDEN", "credentials.service.login");
};

const refresh = async (userToken) => {
  if (!userToken || !userToken.accessToken)
    throw new AppError("Empty token", "BAD_REQUEST", "credentials.service.refresh");
  const userId = extractUserId(userToken.accessToken);
  const user = await readById(userId, userId);
  logger.debug("User refresh: ", user);
  return getUserToken(user);
};

const deleteById = async (id, userId) => {
  const current = await usersRepository.selectById(id);
  if (!current) return;
  guardIsOwner(userId, current, "credentials.service.deleteById");
  return await usersRepository.deleteById(id);
};

const create = async (user) => {
  const current = await readByEmail(user.email);
  if (current) throw new AppError("User already exist", "CONFLICT", "credentials.service.create");
  return await usersRepository.insert(user);
};

const readByEmail = async (email) => {
  // const users = await usersRepository.selectByKeyValue("email", email);
  const users = await usersRepository.selectByEmail(email);
  return users[0] || undefined;
};

const getUserToken = (user) => {
  return {
    accessToken: signUser(user.id),
    id: user.id,
  };
};

const credentialsService = {
  register,
  refresh,
  login,
  readById,
  deleteById,
};

module.exports = credentialsService;
