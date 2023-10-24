const shared = require("../../shared/shared.index");
const { db, models, utils } = shared;
const { usersRepository } = db;
const { AppError } = models;
const { signUser, guardIsOwner, extractUserId } = utils.authorization;

const readById = async (id, userId) => {
  const current = await usersRepository.selectById(id);
  if (!current) throw new AppError(`User with id: ${id} not found `, "NOT_FOUND", "credentials.service.readById");
  guardIsOwner(userId, current, "credentials.service.readById");
};

const register = async (user) => {
  await create(user);
  return getUserToken(user);
};

const login = async (credentials) => {
  const user = await readByEmail(credentials.email);
  if (user && user.password === credentials.password) {
    return getUserToken(user);
  }
  throw new AppError("Invalid credentials", "FORBIDDEN", "credentials.service.login");
};

const refresh = async (oldToken) => {
  const userId = extractUserId(oldToken);
  const user = await readById(userId);
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
  user.id = new Date().getTime();
  user.createdAt = new Date().toISOString();
  return await usersRepository.insert(user);
};

const readByEmail = async (email) => {
  const users = await usersRepository.selectByKeyValue("email", email);
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
