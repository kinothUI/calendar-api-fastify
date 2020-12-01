"use strict";

module.exports = async function (fastify, opts) {
  const schema = fastify.schema();

  /***************************/
  /*    Create a Meeting     */
  /***************************/
  fastify.route({
    url: "/",
    method: "POST",
    schema: schema.api.meeting.create,
    handler: async (request, reply) => {
      return "POST | This is an example POST-Endpoint /api/meeting";
    },
  });

  /***************************/
  /*   Read all Meetings's   */
  /***************************/
  fastify.route({
    url: "/",
    method: "GET",
    schema: schema.api.meeting.read,
    handler: async (request, reply) => {
      const { Meeting, Account, Team } = fastify.db();

      const meetings = await Meeting.findAll({
        include: [
          {
            model: Account,
            attributes: { exclude: ["password", "updatedAt", "createdAt"] },
            as: "accounts",
            through: { attributes: [] }, // to exclude content of junction-table
          },
          {
            model: Team,
            attributes: { exclude: ["updatedAt", "createdAt"] },
            as: "teams",
            through: { attributes: [] },
          },
        ],
      }).catch((error) => console.log("%c%s", "color: #aa00ff", error));

      return { rep: meetings };
    },
  });

  /***************************/
  /*    Update a Meeting     */
  /***************************/
  fastify.route({
    url: "/",
    method: "PATCH",
    schema: schema.api.meeting.update,
    handler: async (request, reply) => {
      return "PATCH | This is an example PATCH-Endpoint /api/account";
    },
  });

  /***************************/
  /*     Delete a Meeting    */
  /***************************/
  fastify.route({
    url: "/",
    method: "DELETE",
    schema: schema.api.meeting.delete,
    handler: async (request, reply) => {
      const { id } = request.body;
      const { Account } = fastify.db();

      Account.destroy({ where: { id } });
      return "DELETE | This is an example DELETE-Endpoint /api/account";
    },
  });
};
