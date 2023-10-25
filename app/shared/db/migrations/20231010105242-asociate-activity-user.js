"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Activities", "userId", {
      type: Sequelize.INTEGER,
      references: {
        model: "Users",
        key: "id",
        as: "userId",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Activities", "userId");
  },
};
