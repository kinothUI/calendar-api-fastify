"use strict";

const fp = require("fastify-plugin");
const db = require("../models");

module.exports = fp(async (fastify, opts) => {
  fastify.decorate("db", () => db);
});
