"use strict";

const tableName = "meeting_account";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable(tableName, {
      meetingId: {
        field: "meeting_id",
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: false,
        references: {
          model: "Meeting",
          key: "id",
        },
      },
      accountId: {
        field: "account_id",
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: false,
        references: {
          model: "Account",
          key: "id",
        },
      },
      createdAt: {
        field: "created_at",
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        field: "updated_at",
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable(tableName);
  },
};
