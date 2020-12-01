"use strict";

const tableName = "meeting";
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
        {
          topic: "Meeting #1",
          time: "heute",
          note: "Für Frühstück ist gesorgt",
          created_at: date,
          updated_at: date,
        },
        { topic: "Meeting #2", time: "morgen", note: "nix", created_at: date, updated_at: date },
        {
          topic: "Meeting #3",
          time: "nächste Woche",
          note: "Jeder bringt bitte Block und Stift mit!",
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
    await queryInterface.bulkDelete(tableName, null, {});
  },
};
