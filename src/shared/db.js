const db = require("../db/models");
const User = require("./db/user.repository");
const Activity = require("./db/activity.repository");

db.users = User.defineUserRepository(db.sequelize, db.Sequelize.DataTypes);
db.activities = Activity.defineActivityRepository(db.sequelize, db.Sequelize.DataTypes);

module.exports = db;
