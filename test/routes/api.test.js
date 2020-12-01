"use strict";

const { test } = require("tap");
const { build } = require("../helper");

test("routes/api is loaded", async (t) => {
  const app = build(t);

  const res = await app.inject({
    url: "/api",
  });
  t.equal(res.payload, "nothing in here");
});
