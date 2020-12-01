"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Meeting extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Meeting.belongsToMany(models.Account, {
        foreignKey: "meetingId",
        through: "meeting_account",
        as: "accounts",
      });

      models.Meeting.belongsToMany(models.Team, {
        foreignKey: "meetingId",
        through: "meeting_team",
        as: "teams",
      });
    }
  }
  Meeting.init(
    {
      topic: DataTypes.STRING,
      time: DataTypes.STRING,
      note: DataTypes.STRING,
    },
    {
      sequelize,
      underscored: true,
      tableName: "meeting",
      // funktioniert nur über Class getters() und setters()
      // https://stackoverflow.com/questions/56628533/sequelize-afterfind-hook-not-executed-when-querying-with-relations-association
      // hooks: {
      //   afterFind: (instance, options) => {
      //     // return null on associations if there are no results
      //     const meetings = instance.map((Meeting) => ({
      //       ...Meeting,
      //       accounts: !!Meeting.accounts.length ? Meeting.accounts : null,
      //       teams: !!Meeting.teams.length ? Meeting.teams : null,
      //     }));
      //   },
      // },
    }
  );
  return Meeting;
};
