"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Activity extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Activity.belongsTo(models.User, {
        foreignKey: "userId",
        as: "user",
      });
    }
  }
  Activity.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      price: DataTypes.DECIMAL,
      quorum: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Activity",
    }
  );
  return Activity;
};
