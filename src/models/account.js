"use strict";

const { Model } = require("sequelize");
const bcrypt = require("bcrypt");

module.exports = (sequelize, DataTypes) => {
  class Account extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Account.belongsToMany(models.Team, {
        foreignKey: "accountId",
        through: "account_team",
        as: "teams",
      });

      models.Account.belongsToMany(models.Meeting, {
        foreignKey: "accountId",
        through: "meeting_account",
        as: "meetings",
      });
    }

    static async comparePassword(plain, hashed) {
      return bcrypt.compare(plain, hashed);
    }
  }

  Account.init(
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: DataTypes.STRING,
      password: {
        type: DataTypes.STRING,
        set(value) {
          this.setDataValue("password", bcrypt.hashSync(value, 10));
        },
      },
      isAdmin: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      underscored: true,
      tableName: "account",
    }
  );

  Account.afterFind("nullifyEmptyTeams", (account, options) => {
    if (Array.isArray(account)) {
      account.forEach((account) => {
        const teams = account.getDataValue("teams");

        if (teams.length === 0) account.setDataValue("teams", null);
      });
    } else {
      const teams = account.getDataValue("teams");

      if (teams.length === 0) account.setDataValue("teams", null);
    }
  });

  return Account;
};
