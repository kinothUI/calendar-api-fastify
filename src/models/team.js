"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Team extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Team.belongsToMany(models.Account, {
        foreignKey: "teamId",
        through: "account_team",
        as: "members",
      });

      models.Team.belongsToMany(models.Meeting, {
        foreignKey: "teamId",
        through: "meeting_team",
        as: "meetings",
      });
    }
  }
  Team.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      underscored: true,
      tableName: "team",
    }
  );

  Team.afterFind("nullifyEmptyMembers", (team) => {
    if (Array.isArray(team)) {
      team.forEach((team) => {
        const members = team.getDataValue("members");

        if (members.length === 0) team.setDataValue("members", null);
      });
    } else {
      const members = account.getDataValue("members");

      if (members.length === 0) team.setDataValue("members", null);
    }
  });

  return Team;
};
