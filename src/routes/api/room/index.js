"use strict";

module.exports = async function (fastify, opts) {
  const schema = fastify.schema();

  /***************************/
  /*      Create a Room      */
  /***************************/
  fastify.route({
    url: "/",
    method: "POST",
    schema: schema.api.room.create,
    handler: async (request, reply) => {
      const { name } = request.body;
      const { Room } = fastify.db();

      await Room.create({ name }).catch((error) => console.log(error));

      reply.code(204).send();
    },
  });

  /***************************/
  /*     Read all Room's     */
  /***************************/
  fastify.route({
    url: "/",
    method: "GET",
    schema: schema.api.room.read,
    handler: async (request, reply) => {
      const { Room } = fastify.db();

      const rooms = await Room.findAll();

      return { rep: rooms };
    },
  });

  /***************************/
  /*      Patch a Room       */
  /***************************/
  fastify.route({
    url: "/",
    method: "PATCH",
    schema: schema.api.room.update,
    handler: async (request, reply) => {
      const { id, name } = reqeust.body;
      const { Room } = fastify.db();

      await Room.update({ name }, { where: { id } });

      reply.code(204).send();
    },
  });

  /***************************/
  /*      Delete a Room      */
  /***************************/
  fastify.route({
    url: "/",
    method: "DELETE",
    schema: schema.api.room.delete,
    handler: async (request, reply) => {
      const { id } = request.body;
      const { Room } = fastify.db();

      await Room.destroy({ where: { id } }).catch((error) => console.log(error));

      reply.code(204).send();
    },
  });
};
