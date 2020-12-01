"use strict";

const tableName = "meeting_team";

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
      teamId: {
        field: "team_id",
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: false,
        references: {
          model: "Team",
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
