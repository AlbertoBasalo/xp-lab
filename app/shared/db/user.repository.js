const defineRepository = (sequelize, DataTypes) => {
  const Model = require("./models/user")(sequelize, DataTypes);
  Model.selectByKeyValue = async (key, value) => await Model.findOne({ where: { key: value } });
  Model.selectById = async (id) => await Model.findByPk(id);
  Model.insert = async (item) => await Model.create(item);
  Model.deleteById = async (id) => await Model.destroy({ where: { id } });
  return Model;
};

const model = { defineRepository };
module.exports = model;
