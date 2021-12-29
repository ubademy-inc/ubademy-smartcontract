"use strict";

const fastify = require("./server");

const PORT = process.env.PORT || 3000;


const start = async () => {
  try {
    fastify.listen(PORT, "0.0.0.0").then(r => fastify.log.info(`server listening on ${r}`));
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
