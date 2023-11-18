// todo: receive EnhancedNumber and put into mongo

import * as RabbitMQ from "./events/rabbitmq";
import * as Mongo from "./database/mongo";

async function init() {
  await Mongo.init();
  await RabbitMQ.init();
}

async function deinit() {
  await RabbitMQ.deinit();
  await Mongo.deinit();
}

process.on("SIGHUP", deinit);
process.on("SIGINT", deinit);
process.on("SIGTERM", deinit);

(async function main() {
  await init();
})();
