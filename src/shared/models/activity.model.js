const defineActivityModel = (sequelize, DataTypes) => {
  const Activity = require("../../db/models/activity")(sequelize, DataTypes);
  Activity.selectAll = async (name) => await Activity.findAll();
  Activity.selectById = async (id) => await Activity.findByPk(id);
  Activity.selectByUserId = async (userId) => await Activity.findAll({ where: { userId } });
  Activity.insert = async (activity) => await Activity.create(activity);
  Activity.update = async (id, activity) => await Activity.update(activity, { where: { id } });
  Activity.deleteById = async (id) => await Activity.destroy({ where: { id } });
  return Activity;
};

const activityModel = { defineActivityModel };
module.exports = activityModel;
