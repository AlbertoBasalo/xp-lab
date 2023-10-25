const jwt = require("jsonwebtoken");
const env = require("dotenv").config().parsed;
const logger = require("./logger.utils");
const { AppError } = require("../models/models.index");
const { JSON } = require("sequelize");
const secret = env.JWT_SECRET;
const expiration = { expiresIn: env.JWT_EXPIRES_IN };

const signUser = (userId) => jwt.sign({ sub: userId }, secret, expiration);

const extractUserId = (token) => {
  const decoded = jwt.decode(token);
  return decoded.sub;
};

const guardIsOwner = (userId, item, source) => {
  const isOwner = item.userId && item.userId == userId;
  if (isOwner) return;
  const isHimself = item.id && item.id == userId;
  if (isHimself) return;
  throw new AppError(`User ${userId} is not the owner of ${JSON.stringify(item)}`, "FORBIDDEN", source);
};

/**
 * Authorization shared functions.
 * @description Generates JWT and ensures ownership.
 */
module.exports = authorization = {
  /** Checks if the user is owner of an item
   * @param {*} userId The user ID
   * @param {*} item The item to check
   * @param {*} source The caller, acting as source in case of error
   * @throws {AppError} If the user is not the owner of the item
   */
  guardIsOwner,
  /**
   * Generates a valid JWT for a user ID.
   * @param {*} userId The user ID (the token payload).
   * @returns A JWT for the user with the ID as the sub value.
   */
  signUser,
  /**
   * Extracts the user ID from a JWT.
   * @param {*} token The JWT to extract the user ID from.
   * @returns The user ID.
   */
  extractUserId,
};
