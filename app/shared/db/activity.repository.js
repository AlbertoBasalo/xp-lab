const models = require("./models");

module.exports = adaptRepository = () => {
  const ActivityModel = require("./models/activity")(models.sequelize, models.Sequelize.DataTypes);
  ActivityModel.selectAll = async () => await ActivityModel.findAll();
  ActivityModel.selectById = async (id) => await ActivityModel.findByPk(id);
  ActivityModel.selectByKeyValue = async (key, value) => {
    const filter = {};
    filter[key] = value;
    return await ActivityModel.findAll({ where: filter });
  };
  ActivityModel.selectByUserId = async (userId) => await ActivityModel.findAll({ where: { userId } });
  ActivityModel.insert = async (item) => await ActivityModel.create(item);
  ActivityModel.update = async (id, item) => await ActivityModel.update(item, { where: { id } });
  ActivityModel.deleteById = async (id) => await ActivityModel.destroy({ where: { id } });
  ActivityModel.deleteAll = async () => await ActivityModel.destroy({ where: { id: { [models.Sequelize.Op.gt]: 0 } } });
  return ActivityModel;
};
