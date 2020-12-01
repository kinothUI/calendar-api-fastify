"use strict";

const fp = require("fastify-plugin");

module.exports = fp(async (fastify, opts) => {
  fastify.decorate("handleNotAuthenticated", () =>
    Promise.reject({
      statusCode: 500,
      error: "Internal Server Error",
      message: "Full Authentication required!",
    })
  );
});
