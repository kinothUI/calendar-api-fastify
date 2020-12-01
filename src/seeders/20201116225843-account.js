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
      "account",
      [
        {
          first_name: "Franziska",
          last_name: "Grau",
          email: "franzi@netzwerk.loc",
          password: "$2b$10$PAeivPtsz1n4uukjXdN/Cex4GsitWO8GHXmai.Vkx2O5mq6wId6FK", //"franzi"
          is_admin: true,
          created_at: date,
          updated_at: date,
        },
        {
          first_name: "Viktor",
          last_name: "Baan",
          email: "viktor@netzwerk.loc",
          password: "$2b$10$ytv1fdFlvUStNh98fl1.OO4UV7Fvk3WiavqyTWbOvOsCVJJa5YcMa", //"viktor"
          is_admin: false,
          created_at: date,
          updated_at: date,
        },
        {
          first_name: "Stefan",
          last_name: "Gistl",
          email: "stefan@netzwerk.loc",
          password: "$2b$10$Q9egNyA5dexnCp8xqaBAWe/FMgnbYdgyeAUu4xzrZ1GhG5IgJD5/q", //"stefan"
          is_admin: false,
          created_at: date,
          updated_at: date,
        },
        {
          first_name: "Andreas",
          last_name: "Kalous",
          email: "andreas@netzwerk.loc",
          password: "$2b$10$W3INoPFKMRxDQOiawn2ic.2XH1DAqe02tal9vzIMIbLpEvWT2Q05O", //"andreas"
          is_admin: false,
          created_at: date,
          updated_at: date,
        },
        {
          first_name: "Maximilian",
          last_name: "Haindl",
          email: "maximilian@netzwerk.loc",
          password: "$2b$10$ytv1fdFlvUStNh98fl1.OO4UV7Fvk3WiavqyTWbOvOsCVJJa5YcMa", //"maximilian"
          is_admin: true,
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
    await queryInterface.bulkDelete("account", null, {});
  },
};
