"use strict";

const path = require("path");
const AutoLoad = require("fastify-autoload");
const helmet = require("fastify-helmet");
const jsonwebtoken = require("fastify-jwt");
const cookie = require("fastify-cookie");
const cors = require("fastify-cors");
const multer = require("fastify-multer");

const textOnlyMulter = multer();

module.exports = async function (fastify, opts) {
  // Place here your custom code!

  // Do not touch the following lines

  // allowing cors requests in development environment
  // preflight option enabled by default
  // docs: https://github.com/fastify/fastify-cors
  fastify.register(cors, {
    origin: process.env.NODE_ENV === "production" ? false : true,
    credentials: true,
  });

  // initializing a multer instance for parsing login-data
  fastify.register(textOnlyMulter.contentParser);

  // This loads all plugins defined in plugins
  // those should be support plugins that are reused
  // through your application
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, "plugins"),
    options: Object.assign({}, opts),
  });

  // This loads all plugins defined in routes
  // define your routes in one of these
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, "routes"),
    options: Object.assign({}, opts, { multer: textOnlyMulter }),
  });

  // using fastify-helmet
  // docs: https://github.com/fastify/fastify-helmet
  fastify.register(helmet, (fastify) => {
    const baseDirective = ["'self'"];

    return {
      contentSecurityPolicy: {
        directives: {
          defaultSrc: baseDirective,
          baseUri: baseDirective,
          blockAllMixedContent: [""],
          fontSrc: baseDirective.concat("https:", "data:"),
          imgSrc: baseDirective.concat("data:", "http:", "https"),
          objectSrc: ["'none'"],
          scriptSrc: baseDirective.concat("'unsafe-inline'", fastify.swaggerCSP.script),
          scriptSrcAttr: ["'none'"],
          styleSrc: baseDirective.concat("https:", fastify.swaggerCSP.style),
          upgradeInsecureRequests: [""],
        },
      },
    };
  });

  // decorates `fastify` with standard jsonwebtoken methods
  // docs: https://github.com/fastify/fastify-jwt
  fastify.register(jsonwebtoken, (fastify) => {
    const { TOKEN_NAME } = fastify.authOptions();

    // custom unauthorized/bad-request messages
    // docs: https://github.com/fastify/fastify-jwt/blob/9145b32d48d45420787fa71b67c86c048b56a794/jwt.js#L12
    const messages = {
      noAuthorizationInCookieMessage: "Full Authentication required for this resource",
    };

    return {
      secret: process.env.JWT_SECRET,
      cookie: { cookieName: TOKEN_NAME },
      messages,
    };
  });

  // using fastify-cookie to attach jsonwebtoken on each
  // authorized request
  // docs: https://github.com/fastify/fastify-cookie
  fastify.register(cookie, {});

  // test auth-hook
  fastify.addHook("onRequest", (request, reply, done) => {
    if (request.raw.url.includes("/api")) return request.jwtVerify();

    done();
  });
};
