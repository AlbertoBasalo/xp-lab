const defineRepository = (sequelize, DataTypes) => {
  const Model = require("./models/booking")(sequelize, DataTypes);
  Model.selectAll = async () => await Model.findAll();
  Model.selectById = async (id) => await Model.findByPk(id);
  Model.selectByUserId = async (userId) => await Model.findAll({ where: { userId } });
  Model.selectByActivityId = async (activityId) => await Model.findAll({ where: { activityId } });
  Model.insert = async (item) => await Model.create(item);
  Model.update = async (id, item) => await Model.update(item, { where: { id } });
  Model.deleteById = async (id) => await Model.destroy({ where: { id } });
  return Model;
};

const model = { defineRepository };
module.exports = model;
