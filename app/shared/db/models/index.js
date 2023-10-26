"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const process = require("process");

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const configUrl = "../config/config.json";
const config = require(configUrl)[env];

const logger = require("../../utils/logger.utils");
config.logging = (msg) => logger.debug(`${new Date().toLocaleTimeString()} ${msg}`);

const db = {};
let sequelize = new Sequelize(config.url, config);

/** read models from file system */
fs.readdirSync(__dirname)
  .filter((file) => {
    return file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js" && file.indexOf(".test.js") === -1;
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

/** run associate function to create relations between models */
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

/** Export the client instance and the static helper */
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
