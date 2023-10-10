const User = require("./models/user.model");
const Activity = require("./models/activity.model");

const db = require("../../src/db/models");
db.users = User.defineUserModel(db.sequelize, db.Sequelize.DataTypes);
db.activities = Activity.defineActivityModel(db.sequelize, db.Sequelize.DataTypes);

module.exports = db;
