"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class AccountTeam extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.AccountTeam.belongsTo(models.Account, {
        foreignKey: "accountId",
        targetkey: "id",
      });

      models.AccountTeam.belongsTo(models.Team, {
        foreignKey: "teamId",
        targetKey: "id",
      });
    }
  }
  AccountTeam.init(
    {},
    {
      sequelize,
      tableName: "account_team",
      underscored: true,
    }
  );
  return AccountTeam;
};
