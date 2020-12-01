"use strict";

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
      "team",
      [
        { name: "Marketing", created_at: date, updated_at: date },
        { name: "Sales", created_at: date, updated_at: date },
        { name: "R&D", created_at: date, updated_at: date },
        { name: "Geschäftsführung", created_at: date, updated_at: date },
        { name: "Azubis", created_at: date, updated_at: date },
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
    await queryInterface.bulkDelete("team", null, {});
  },
};
