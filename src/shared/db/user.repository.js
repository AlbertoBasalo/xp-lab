const defineRepository = (sequelize, DataTypes) => {
  const Model = require("../../db/models/user")(sequelize, DataTypes);
  Model.selectByEmail = async (email) => await Model.findOne({ where: { email } });
  Model.selectById = async (id) => await Model.findByPk(id);
  Model.insert = async (item) => await Model.create(item);
  Model.deleteById = async (id) => await Model.destroy({ where: { id } });
  return Model;
};

const model = { defineRepository };
module.exports = model;
