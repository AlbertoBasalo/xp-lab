const { AppError, MemoryRepository } = require("../shared/_shared");
const { signUser } = require("../middleware/_middleware").security;
const usersRepository = MemoryRepository([]);

const readById = async (id, userId) => {
  const current = await usersRepository.selectById(id);
  if (!current) throw new AppError(`User with id: ${id} not found `, "NOT_FOUND", "users.readById");
  guardIsOwner(userId, current, "users.readById");
};

const readByEmail = async (email) => {
  const users = await usersRepository.selectByKeyValue("email", email);
  return users[0] || undefined;
};

const register = async (user) => {
  const current = await readByEmail(user.email);
  if (current) throw new AppError("User already exist", "CONFLICT", "users.create");
  user.id = new Date().getTime();
  user.createdAt = new Date().toISOString();
  const inserted = await usersRepository.insert(user);
  if (!inserted) throw new AppError("User could not be registered", "DATA", "users.create");
  const userToken = {
    accessToken: signUser(user.id),
    id: user.id,
  };
  return userToken;
};

const login = async (credentials) => {
  const user = await readByEmail(credentials.email);
  if (user && user.password === credentials.password) {
    const userToken = {
      accessToken: signUser(user.id),
      id: user.id,
    };
    return userToken;
  }
  throw new AppError("Invalid credentials", "FORBIDDEN", "users.validateCredentials");
};

const deleteById = async (id, userId) => {
  const current = await usersRepository.selectById(id);
  if (!current) return;
  guardIsOwner(userId, current, "users.readById");
  return await usersRepository.deleteById(id);
};

const guardIsOwner = (userId, item, source) => {
  if (userId !== item.id) {
    throw new AppError("User is not the owner", "FORBIDDEN", source);
  }
};

/**
 * Business logic for Users entities
 * @description should not know about the HTTP layer nor the database layer implementation details
 */
const usersService = {
  readById,
  register,
  login,
  deleteById,
};

module.exports = usersService;
