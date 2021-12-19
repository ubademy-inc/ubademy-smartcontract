"use strict";

const fastify = require("./server");

const PORT = process.env.PORT || 3000;

// const swaggerUi = require('swagger-ui-express');
// const swaggerDocument = require('./swagger.json');

// app.use('/api-docs',
//   swaggerUi.serve, 
//   swaggerUi.setup(swaggerDocument)
// );
// Run the server!
const start = async () => {
  try {
    await fastify.listen(PORT);
    fastify.log.info(`server listening on ${fastify.server.address().port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
