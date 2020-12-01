"use strict";

const tableName = "meeting_account";
const date = new Date();

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    await queryInterface.bulkInsert(
      tableName,
      [
        { meeting_id: 1, account_id: 2, created_at: date, updated_at: date },
        { meeting_id: 1, account_id: 3, created_at: date, updated_at: date },
        { meeting_id: 1, account_id: 4, created_at: date, updated_at: date },
        { meeting_id: 2, account_id: 3, created_at: date, updated_at: date },
        { meeting_id: 3, account_id: 3, created_at: date, updated_at: date },
        { meeting_id: 3, account_id: 4, created_at: date, updated_at: date },
        { meeting_id: 3, account_id: 1, created_at: date, updated_at: date },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete(tableName, null, {});
  },
};
