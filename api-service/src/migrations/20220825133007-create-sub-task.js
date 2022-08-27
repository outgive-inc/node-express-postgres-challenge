"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
      await queryInterface.createTable("subtasks", {
        subTaskId: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          autoIncrement: false,
          allowNull: false,
          primaryKey: true,
        },
        title: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        completed: {
          type: Sequelize.BOOLEAN,
          defaultValue: false,
        },
        taskId: {
          type: Sequelize.UUID,
          references: {
            model: "tasks",
            key: "taskId",
            as: "taskId",
          },
          onDelete: "CASCADE",
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
      });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("subtasks");
  },
};
