require("dotenv").config();

const { NODE_ENV, DB_DB, DB_HOST, DB_PORT, USERNAME, PASSWORD, JWT_SECRET } = process.env;

console.log("loading environment variables...\n");
console.log(
  `| NODE_ENV:\t ${NODE_ENV}\n| DB_DB:\t ${DB_DB}\n| DB_HOST:\t ${DB_HOST}\n| DB_PORT:\t ${DB_PORT}\n| USERNAME:\t ${USERNAME}\n| PASSWORD:\t ${PASSWORD}\n| JWT_SECRET:\t ${JWT_SECRET}\n`
);
console.log("...loading done!\n");

const connectionDetails = {
  username: USERNAME,
  password: PASSWORD,
  database: DB_DB,
  host: DB_HOST,
  port: DB_PORT,
  dialect: "mysql",
};

module.exports = {
  development: connectionDetails,
  production: connectionDetails,
  JWT_SECRET,
};
