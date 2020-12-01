"use strict";

const date = new Date();
const data = [
  { account_id: 1, team_id: 1, created_at: date, updated_at: date }, // franzi -> Marketing
  { account_id: 1, team_id: 4, created_at: date, updated_at: date }, // franzi -> Geschäftsführung
  { account_id: 2, team_id: 2, created_at: date, updated_at: date }, // viktor -> Sales
  { account_id: 2, team_id: 3, created_at: date, updated_at: date }, // viktor -> R&D
  { account_id: 3, team_id: 3, created_at: date, updated_at: date }, // stefan -> R&D
  { account_id: 4, team_id: 1, created_at: date, updated_at: date }, // andreas -> Marketing
  { account_id: 4, team_id: 3, created_at: date, updated_at: date }, // andreas -> R&D
  { account_id: 5, team_id: 4, created_at: date, updated_at: date }, // maxi -> Geschäftsführung
  { account_id: 5, team_id: 3, created_at: date, updated_at: date }, // maxi -> R&D
];

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
    await queryInterface.bulkInsert("account_team", data, {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("account_team", null, {});
  },
};
