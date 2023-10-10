const defineUserModel = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "user",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        isEmail: true,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { timestamps: true }
  );
  User.readByEmail = async (email) => {
    const user = await User.findOne({ where: { email } });
    return user;
  };
  User.insert = async (user) => {
    return await User.create(user);
  };
  return User;
};

const userModel = { defineUserModel };
module.exports = userModel;
