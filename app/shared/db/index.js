const db = require("./db/models");
const User = require("./user.repository");
const Activity = require("./activity.repository");
const Booking = require("./booking.repository");

db.users = User.defineRepository(db.sequelize, db.Sequelize.DataTypes);
db.activities = Activity.defineRepository(db.sequelize, db.Sequelize.DataTypes);
db.bookings = Booking.defineRepository(db.sequelize, db.Sequelize.DataTypes);

module.exports = db;
