"use strict";

module.exports = async function (fastify, opts) {
  fastify.get("/", async function (request, reply) {
    throw new Error("Got to specify an Entity");
  });
};
