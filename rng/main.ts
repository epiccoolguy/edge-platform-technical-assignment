import crypto from "crypto";

import * as RabbitMQ from "./events/rabbitmq";

const lowerBound = 10000000000;
const upperBound = 999999999999;

// todo: send this off to metadata
const random = crypto.randomInt(lowerBound, upperBound);

console.log(Number.isSafeInteger(lowerBound));
console.log(Number.isSafeInteger(upperBound));
console.log(random);

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
