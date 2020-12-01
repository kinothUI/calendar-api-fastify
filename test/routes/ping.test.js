"use strict";

const { test } = require("tap");
const { build } = require("../helper");

test("ping is loaded", async (t) => {
  const app = build(t);

  const res = await app.inject({
    url: "/ping",
  });
  t.equal(res.payload, "pong");
});

// inject callback style:
//
// test('example is loaded', (t) => {
//   t.plan(2)
//   const app = build(t)
//
//   app.inject({
//     url: '/example'
//   }, (err, res) => {
//     t.error(err)
//     t.equal(res.payload, 'this is an example')
//   })
// })
