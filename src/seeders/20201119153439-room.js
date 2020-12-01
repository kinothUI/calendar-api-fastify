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
      "room",
      [
        {
          name: "Everest",
          created_at: date,
          updated_at: date,
        },
        {
          name: "Matterhorn",
          created_at: date,
          updated_at: date,
        },
        {
          name: "Dachstein",
          created_at: date,
          updated_at: date,
        },
        {
          name: "Kilimancharo",
          created_at: date,
          updated_at: date,
        },
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
    await queryInterface.bulkDelete("room", null, {});
  },
};
