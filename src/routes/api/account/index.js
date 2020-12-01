"use strict";

module.exports = async function (fastify, opts) {
  const schema = fastify.schema();

  /***************************/
  /*    Creates an Account   */
  /***************************/
  fastify.route({
    url: "/",
    method: "POST",
    schema: schema.api.account.create,
    handler: async (request, reply) => {
      let { firstName, lastName, email, password, isAdmin, teams } = request.body;
      const { Account } = fastify.db();

      teams = !teams ? [] : teams;

      const account = await Account.create({
        firstName,
        lastName,
        email,
        password,
        isAdmin,
      }).catch((error) => console.log(error));

      // still need to handle unexpected errors like in .catch, throughout all endpoints
      await account.setTeams(teams).catch((err) => console.log(err));

      reply.code(201).send();
    },
  });

  /***************************/
  /*    Reads all Account's  */
  /***************************/
  fastify.route({
    url: "/",
    method: "GET",
    schema: schema.api.account.read,
    handler: async () => {
      const { Account, Team } = fastify.db();

      const accounts = await Account.findAll({
        attributes: { exclude: ["password"] },
        include: [
          {
            model: Team,
            attributes: ["id", "name"],
            as: "teams",
            through: { attributes: [] }, // to exclude content of junction-table
          },
        ],
      }).catch((error) =>
        console.log("%c%s", "color: #aa00ff", "fehler, was soll ich hier machen?", error)
      );

      return { rep: accounts };
    },
  });

  /***************************/
  /*    Updates an Account   */
  /***************************/
  fastify.route({
    url: "/",
    method: "PATCH",
    schema: schema.api.account.update,
    handler: async (request, reply) => {
      const { id, firstName, lastName, email, isAdmin, teams } = request.body;
      const { Account, Team } = fastify.db();

      const hasTeams = teams && !!teams.length;

      const accountInstance = await Account.findOne({
        where: { id: request.body.id },
        include: [
          {
            model: Team,
            attributes: ["id", "name"],
            as: "teams",
            through: { attributes: [] },
          },
        ],
      });

      const UpdateAccount = async ({ id, firstName, lastName, email, isAdmin }) =>
        await Account.update({ firstName, lastName, email, isAdmin }, { where: { id } });

      if (hasTeams) {
        await UpdateAccount({ id, firstName, lastName, email, isAdmin });
        await accountInstance.setTeams(teams).catch((error) => console.log(error));

        return reply.code(204).send();
      }

      await UpdateAccount({ id, firstName, lastName, email, isAdmin });

      reply.code(204).send();
    },
  });

  /***************************/
  /*    Deletes an Account   */
  /***************************/
  fastify.route({
    url: "/",
    method: "DELETE",
    schema: schema.api.account.delete,
    handler: async (request, reply) => {
      const { Account } = fastify.db();
      const { id } = request.body;

      await Account.destroy({
        where: { id },
      }).then((then) => console.log(then));

      reply.code(204).send();
    },
  });
};
