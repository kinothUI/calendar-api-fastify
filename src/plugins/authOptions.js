"use strict";

const fp = require("fastify-plugin");
const moment = require("moment");

// the use of fastify-plugin is required to be able
// to export the decorators to the outer scope
module.exports = fp(async function (fastify, opts) {
  fastify.decorate("authOptions", function () {
    const expirySec = 60 * 60;
    const expiryDate = moment().add(1, "hour").toDate().toJSON();
    console.log("%c%s", "color: #1d5673", expiryDate);
    const maxAge = 1000 * 60 * 60 * 24 * 365 * 42;

    const isProductionEnv = process.env.NODE_ENV === "production" ? true : false;

    return {
      TOKEN_NAME: "ACCESS-TOKEN",
      TOKEN_EXPIRY_NAME: "ACCESS-TOKEN-EXPIRY",
      TOKEN_EXPIRY: expirySec,
      TOKEN_EXPIRY_DATE: expiryDate,
      COOKIE_MAX_AGE: maxAge,
      TOKEN_COOKIE_OPTIONS: { path: "/", secure: isProductionEnv, httpOnly: true, maxAge },
      EXPIRY_COOKIE_OPTIONS: { path: "/", maxAge },
    };
  });
});
