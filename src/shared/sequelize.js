const Sequelize = require("sequelize");
const dotenv = require("dotenv");
const User = require("./models/user.model");
const Activity = require("./models/activity.model");
const { parsed: env } = dotenv.config();

const sequelize = new Sequelize(env.DB_URL, {
  dialect: "postgres",
});

//checking if connection is done
sequelize
  .authenticate()
  .then(() => {
    console.log(`Database connected to discover`);
  })
  .catch((err) => {
    console.log(err);
  });

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = User.defineUserModel(sequelize, Sequelize.DataTypes);
db.activities = Activity.defineActivityModel(sequelize, Sequelize.DataTypes);
//exporting the module
module.exports = db;
