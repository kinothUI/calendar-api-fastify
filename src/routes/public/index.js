"use strict";

module.exports = async function (fastify, opts) {
  const schema = fastify.schema();

  /***************************/
  /*          Login          */
  /***************************/
  fastify.route({
    url: "/login",
    method: "POST",
    schema: schema.public.login,
    preHandler: opts.multer.none(),
    handler: async (request, reply) => {
      const { Account } = fastify.db();

      const {
        body: { password },
      } = request;

      const {
        TOKEN_NAME,
        TOKEN_EXPIRY_NAME,
        TOKEN_EXPIRY,
        TOKEN_EXPIRY_DATE,
        TOKEN_COOKIE_OPTIONS,
        EXPIRY_COOKIE_OPTIONS,
      } = fastify.authOptions();

      const account = await Account.findOne({ where: { email: request.body.email }, hooks: false });

      if (!account) return reply.code(401).send();

      const passwordMatches = await Account.comparePassword(password, account.password);

      const { id, firstName, lastName, email, isAdmin } = account;

      if (passwordMatches) {
        const token = await reply.jwtSign(
          { id, firstName, lastName, email, isAdmin },
          { expiresIn: TOKEN_EXPIRY }
        );

        console.log("TOKEN_EXPIRY_DATE", TOKEN_EXPIRY_DATE);

        reply
          .setCookie(TOKEN_NAME, token, TOKEN_COOKIE_OPTIONS)
          .setCookie(TOKEN_EXPIRY_NAME, TOKEN_EXPIRY_DATE, EXPIRY_COOKIE_OPTIONS)
          .send();
      } else reply.code(401).send();
    },
  });

  /***************************/
  /*          Logout         */
  /***************************/
  fastify.route({
    url: "/logout",
    method: "POST",
    schema: schema.public.logout,
    handler: async (request, reply) => {
      return [];
    },
  });

  /***************************/
  /*       Own Account       */
  /***************************/
  fastify.route({
    url: "/account",
    method: "GET",
    schema: schema.public.account,
    handler: async (request, reply) => {
      const {
        TOKEN_NAME,
        TOKEN_EXPIRY_NAME,
        TOKEN_EXPIRY,
        TOKEN_EXPIRY_DATE,
        TOKEN_COOKIE_OPTIONS,
        EXPIRY_COOKIE_OPTIONS,
      } = fastify.authOptions();

      if (request.cookies[TOKEN_NAME]) {
        const account = await request.jwtVerify();

        const token = await reply.jwtSign(
          {
            id: account.id,
            firstName: account.firstName,
            lastName: account.lastName,
            email: account.email,
            isAdmin: account.isAdmin,
          },
          { expiresIn: TOKEN_EXPIRY }
        );

        reply
          .setCookie(TOKEN_NAME, token, TOKEN_COOKIE_OPTIONS)
          .setCookie(TOKEN_EXPIRY_NAME, TOKEN_EXPIRY_DATE, EXPIRY_COOKIE_OPTIONS)
          .send({
            id: account.id,
            firstName: account.firstName,
            lastName: account.lastName,
            email: account.email,
            isAdmin: account.isAdmin,
          });
      } else reply.code(204).send();
    },
  });
};
