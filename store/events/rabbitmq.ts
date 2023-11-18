import { AMQPClient } from "@cloudamqp/amqp-client";
import { AMQPBaseClient } from "@cloudamqp/amqp-client/types/amqp-base-client";

import { RABBITMQ_URI } from "../constants";
import { init as initPhoneNumberStored } from "./publishers/phone-number-stored";
import { init as initPhoneNumberEnhanced } from "./subscribers/phone-number-enhanced";

let amqp: AMQPClient;
let connection: AMQPBaseClient;

async function initPublishers(connection: AMQPBaseClient) {
  await initPhoneNumberStored(connection);
}

async function initSubscribers(connection: AMQPBaseClient) {
  await initPhoneNumberEnhanced(connection);
}

export async function init() {
  amqp = amqp = new AMQPClient(RABBITMQ_URI);
  connection = await amqp.connect();

  await initPublishers(connection);
  await initSubscribers(connection);

  console.info(`connected to ${RABBITMQ_URI}`);
}

export async function deinit() {
  await connection.close();
  console.info(`closed connection to ${RABBITMQ_URI}`);
}
