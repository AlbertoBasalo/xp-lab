const models = require("./models");

module.exports = adaptRepository = () => {
  const BookingModel = require("./models/booking")(models.sequelize, models.Sequelize.DataTypes);
  BookingModel.selectAll = async () => await BookingModel.findAll();
  BookingModel.selectById = async (id) => await BookingModel.findByPk(id);
  BookingModel.selectByKeyValue = async (key, value) => {
    const filter = {};
    filter[key] = value;
    return await BookingModel.findAll({ where: filter });
  };
  BookingModel.selectByUserId = async (userId) => await BookingModel.findAll({ where: { userId } });
  BookingModel.selectByActivityId = async (activityId) => await BookingModel.findAll({ where: { activityId } });
  BookingModel.insert = async (item) => await BookingModel.create(item);
  BookingModel.update = async (id, item) => await BookingModel.update(item, { where: { id } });
  BookingModel.deleteById = async (id) => await BookingModel.destroy({ where: { id } });
  BookingModel.deleteAll = async () => await BookingModel.destroy({ where: { id: { [models.Sequelize.Op.gt]: 0 } } });
  return BookingModel;
};
