import { AMQPClient } from "@cloudamqp/amqp-client";
import { AMQPBaseClient } from "@cloudamqp/amqp-client/types/amqp-base-client";

import { RABBITMQ_URI } from "../constants";
import { init as initPhoneNumberEnhanced } from "./publishers/phone-number-enhanced";
import { init as initPhoneNumberGenerated } from "./subscribers/phone-number-generated";

let amqp: AMQPClient;
let connection: AMQPBaseClient;

async function initPublishers(connection: AMQPBaseClient) {
  await initPhoneNumberEnhanced(connection);
}

async function initSubscribers(connection: AMQPBaseClient) {
  await initPhoneNumberGenerated(connection);
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
