const defineUserModel = (sequelize, DataTypes) => {
  const User = require("../../../models/user")(sequelize, DataTypes);
  User.selectByEmail = async (email) => await User.findOne({ where: { email } });
  User.selectById = async (id) => await User.findByPk(id);
  User.insert = async (user) => await User.create(user);
  User.deleteById = async (id) => await User.destroy({ where: { id } });
  return User;
};

const userModel = { defineUserModel };
module.exports = userModel;
