import * as RabbitMQ from "./events/rabbitmq";

async function init() {
  await RabbitMQ.init();
}

async function deinit() {
  await RabbitMQ.deinit();
}

process.on("SIGHUP", deinit);
process.on("SIGINT", deinit);
process.on("SIGTERM", deinit);

(async function main() {
  await init();
})();
