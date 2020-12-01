"use strict";

const tableName = "account_team";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(tableName, {
      accountId: {
        field: "account_id",
        type: Sequelize.INTEGER,
        primaryKey: false,
        allowNull: false,
        references: {
          model: "Account",
          key: "id",
        },
        onDelete: "NO ACTION",
        onUpdate: "NO ACTION",
        unique: "unique-team-per-account",
      },
      teamId: {
        field: "team_id",
        type: Sequelize.INTEGER,
        primaryKey: false,
        allowNull: false,
        references: {
          model: "Team",
          key: "id",
        },
        onDelete: "NO ACTION",
        onUpdate: "NO ACTION",
        unique: "unique-team-per-account",
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
    await queryInterface.dropTable(tableName);
  },
};
