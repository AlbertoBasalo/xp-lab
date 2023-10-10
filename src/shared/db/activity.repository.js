const defineActivityRepository = (sequelize, DataTypes) => {
  const ActivityModel = require("../../db/models/activity")(sequelize, DataTypes);
  ActivityModel.selectAll = async (name) => await ActivityModel.findAll();
  ActivityModel.selectById = async (id) => await ActivityModel.findByPk(id);
  ActivityModel.selectByUserId = async (userId) => await ActivityModel.findAll({ where: { userId } });
  ActivityModel.insert = async (activity) => await ActivityModel.create(activity);
  ActivityModel.update = async (id, activity) => await ActivityModel.update(activity, { where: { id } });
  ActivityModel.deleteById = async (id) => await ActivityModel.destroy({ where: { id } });
  return ActivityModel;
};

const activityModel = { defineActivityRepository };
module.exports = activityModel;
