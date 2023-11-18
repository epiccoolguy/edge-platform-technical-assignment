import * as RabbitMQ from "./events/rabbitmq";
import { generatePhoneNumber } from "./core/generate";
import { publish as publishGeneratedPhoneNumber } from "./events/publishers/phone-number-generated";

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

  setInterval(() => {
    const phoneNumber = generatePhoneNumber();
    publishGeneratedPhoneNumber(phoneNumber);
  }, 1000);
})();
