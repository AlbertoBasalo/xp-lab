const db = require("./models");
const User = require("./user.repository");
const Activity = require("./activity.repository");
const Booking = require("./booking.repository");

db.usersRepository = User.defineRepository(db.sequelize, db.Sequelize.DataTypes);
db.activitiesRepository = Activity.defineRepository(db.sequelize, db.Sequelize.DataTypes);
db.bookingsRepository = Booking.defineRepository(db.sequelize, db.Sequelize.DataTypes);

module.exports = db;
