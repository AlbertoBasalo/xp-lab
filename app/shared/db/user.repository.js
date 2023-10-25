const models = require("./models");

module.exports = adaptRepository = () => {
  const UserModel = require("./models/user")(models.sequelize, models.Sequelize.DataTypes);
  UserModel.selectByKeyValue = async (key, value) => {
    const filter = {};
    filter[key] = value;
    return await UserModel.findAll({ where: filter });
  };
  UserModel.selectById = async (id) => await UserModel.findByPk(id);
  UserModel.selectByEmail = async (email) => await UserModel.findAll({ where: { email } });
  UserModel.insert = async (item) => await UserModel.create(item);
  UserModel.deleteById = async (id) => await UserModel.destroy({ where: { id } });
  UserModel.deleteAll = async () => await UserModel.destroy({ where: { id: { [models.Sequelize.Op.gt]: 0 } } });
  return UserModel;
};
