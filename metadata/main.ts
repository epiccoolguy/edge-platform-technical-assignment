import { getCountryName, isMobileNumber } from "./dictionary";

import * as RabbitMQ from "./events/rabbitmq";
import { EnhancedNumber } from "types";

// todo: send this off to store

function addMetadata(phoneNumber: string): EnhancedNumber {
  const country = getCountryName(String(phoneNumber));
  const mobile = isMobileNumber(phoneNumber);

  return {
    phoneNumber,
    country,
    mobile,
  };
}

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
