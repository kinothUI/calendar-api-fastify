"use strict";

const fp = require("fastify-plugin");

const successRes = "Successfull Response";
const failureRes = "Unauthorized Response";

const failureProps = {
  statusCode: { type: "number" },
  error: { type: "string" },
  message: { type: "string" },
};

const fourOone = {
  401: {
    type: "object",
    description: failureRes,
    properties: failureProps,
  },
};

const accountProps = {
  firstName: { type: "string" },
  lastName: { type: "string" },
  email: { type: "string" },
  isAdmin: { type: "boolean" },
};

const teamProps = {
  name: { type: "string" },
};

const tagPublic = ["public"];
const tagPrivate = ["private"];

const account = {
  create: {
    tags: tagPrivate,
    description: "creates an account",
    body: {
      type: "object",
      required: ["firstName", "lastName", "email", "password"],
      properties: {
        ...accountProps,
        password: { type: "string" },
      },
    },
    response: {
      201: { description: successRes, type: "null" },
      ...fourOone,
    },
  },
  read: {
    tags: tagPrivate,
    description: "lists all accounts with teams",
    response: {
      200: {
        type: "object",
        description: successRes,

        properties: {
          rep: {
            type: "array",
            description: "Array of User Accounts",
            items: {
              type: "object",
              properties: {
                id: { type: "number" },
                ...accountProps,
                teams: {
                  type: "array",
                  nullable: true,
                  items: {
                    type: "object",
                    properties: {
                      id: { type: "number" },
                      ...teamProps,
                    },
                  },
                },
              },
            },
          },
        },
      },
      ...fourOone,
    },
  },
  update: {
    tags: tagPrivate,
    description: "updates an account",
    body: {
      type: "object",
      description: "these properties are necessary to update an account",
      required: ["id"],
      properties: {
        id: { type: "number" },
        ...accountProps,
        teams: {
          type: "array",
          items: {
            type: "number",
          },
        },
      },
    },
    response: {
      204: {
        description: successRes,
        type: "null",
      },
      ...fourOone,
    },
  },
  delete: {
    tags: tagPrivate,
    description: "deletes an account",
    body: {
      type: "object",
      required: ["id"],
      properties: {
        id: { type: "number" },
      },
    },
    response: {
      204: {
        description: successRes,
        type: "object",
        properties: {},
      },
      ...fourOone,
    },
  },
};

const meeting = {
  create: {
    tags: tagPrivate,
    description: "creates a meeting",
    params: {},
    response: {
      ...fourOone,
    },
  },
  read: {
    tags: tagPrivate,
    description: "lists all meetings",
    params: {},
    response: {
      ...fourOone,
    },
  },
  update: {
    tags: tagPrivate,
    description: "updates a meeting",
    params: {},
    response: {
      ...fourOone,
    },
  },
  delete: {
    tags: tagPrivate,
    description: "deletes a meeting",
    params: {
      type: "object",
      required: ["id"],
      properties: {
        id: { type: "number" },
      },
    },
    response: {
      204: {
        description: successRes,
        type: "null",
      },
      ...fourOone,
    },
  },
};

const room = {
  create: {
    tags: tagPrivate,
    description: "",
    params: {},
    response: {
      200: {
        description: successRes,
        type: "null",
      },
      ...fourOone,
    },
  },
  read: {
    tags: tagPrivate,
    description: "",
    params: {},
    response: {
      200: {
        description: successRes,
        type: "object",
        properties: {
          rep: {
            type: "array",
            description: "Array of available Rooms",
            items: {
              type: "object",
              properties: {
                id: { type: "number" },
                name: { type: "string" },
              },
            },
          },
        },
      },
      ...fourOone,
    },
  },
  update: {
    tags: tagPrivate,
    description: "",
    params: {},
    response: {
      200: {
        description: successRes,
        type: "null",
      },
      ...fourOone,
    },
  },
  delete: {
    tags: tagPrivate,
    description: "deletes a room",
    params: {
      type: "object",
      required: ["id"],
      properties: {
        id: { type: "number" },
      },
    },
    response: {
      204: {
        description: successRes,
        type: "null",
      },
      ...fourOone,
    },
  },
};

const team = {
  create: {
    tags: tagPrivate,
    description: "creates a team",
    params: {},
    response: {
      ...fourOone,
    },
  },
  read: {
    tags: tagPrivate,
    description: "lists all teams with members",
    params: {},
    response: {
      200: {
        type: "object",
        description: successRes,
        properties: {
          rep: {
            type: "array",
            items: {
              type: "object",
              properties: {
                id: { type: "number" },
                ...teamProps,
                members: {
                  type: "array",
                  nullable: true,
                  items: {
                    type: "object",
                    properties: {
                      id: { type: "number" },
                      ...accountProps,
                    },
                  },
                },
              },
            },
          },
        },
      },
      ...fourOone,
    },
  },
  update: {
    tags: tagPrivate,
    description: "updates a team",
    params: {},
    response: {
      ...fourOone,
    },
  },
  delete: {
    tags: tagPrivate,
    description: "deletes a team",
    params: {
      type: "object",
      required: ["id"],
      properties: {
        id: { type: "number" },
      },
    },
    response: {
      200: {
        description: successRes,
        type: "null",
      },
      ...fourOone,
    },
  },
};

const login = {
  tags: tagPublic,
  description: "user login",
  params: {
    type: "object",
    properties: {
      email: { type: "string" },
      password: { type: "string" },
    },
  },
  response: {
    200: {
      description: successRes,
      type: "object",
      properties: {},
    },
    ...fourOone,
  },
};

const logout = {
  tags: tagPublic,
  description: "user logout",
  response: {
    200: {
      description: successRes,
      type: "object",
      properties: {},
    },
  },
};

const ownAccount = {
  tags: tagPublic,
  description: "returns either the users own account when user is authenticated or nothing",
  response: {
    200: {
      description: successRes,
      type: "object",
      properties: {
        id: { type: "number" },
        ...accountProps,
      },
    },
    204: {
      description: "User is not authenticated",
      type: "object",
      properties: {},
    },
  },
};

const schema = {
  api: { account, meeting, room, team },
  public: { login, logout, account: ownAccount },
};

module.exports = fp(async (fastify, opts) => {
  fastify.decorate("schema", () => schema);
});
