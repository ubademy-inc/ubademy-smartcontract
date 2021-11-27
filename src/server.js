const config = require("./config");
const services = require("./services/services")({ config });
const routes = require("./routes");

// Require the framework and instantiate it
const fastify = require("fastify")({ logger: true });

// Import Mongo Db
if (process.env.NODE_ENV !== "test") {
  require("./database/db");
}

// Declares routes
routes.forEach(route => fastify.route(route({ config, services })));
