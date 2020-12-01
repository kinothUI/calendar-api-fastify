"use strict";

module.exports = async function (fastify, opts) {
  const schema = fastify.schema();

  /***************************/
  /*      Create a Team      */
  /***************************/
  fastify.route({
    url: "/",
    method: "POST",
    schema: schema.api.team.create,
    handler: async (request, reply) => {
      const { name } = request.body;
      const { Team } = fastify.db();

      await Team.create({ name }).catch((error) => console.log(error));

      reply.code(201).send();
    },
  });

  /***************************/
  /*     Read all Team's     */
  /***************************/
  fastify.route({
    url: "/",
    method: "GET",
    schema: schema.api.team.read,
    handler: async () => {
      const { Account, Team } = fastify.db();

      const teams = await Team.findAll({
        include: [
          {
            model: Account,
            attributes: { exclude: ["password", "createdAt", "updatedAt"] },
            as: "members",
            through: { attributes: [] }, // to exclude content of junction-table
          },
        ],
      }).catch((error) => console.log("fehler, was soll ich hier machen?", error));

      return { rep: teams };
    },
  });

  /***************************/
  /*     Updates a Team      */
  /***************************/
  fastify.route({
    url: "/",
    method: "PATCH",
    schema: schema.api.team.update,
    handler: async (request, reply) => {
      const { id, name } = request.body;
      const { Team } = fastify.db();

      await Team.update({ name }, { where: { id } }).catch((error) => console.log(error));

      reply.code(204).send();
    },
  });

  /***************************/
  /*      Delete a Team      */
  /***************************/
  fastify.route({
    url: "/",
    method: "DELETE",
    schema: schema.api.team.delete,
    handler: async (request, reply) => {
      const { id } = request.body;
      const { Team } = fastify.db();

      await Team.destroy({ where: { id } }).catch((error) => console.log(error));

      reply.code(204).send();
    },
  });
};
