import { AMQPClient } from "@cloudamqp/amqp-client";
import { AMQPBaseClient } from "@cloudamqp/amqp-client/types/amqp-base-client";

import { RABBITMQ_URI } from "../constants";
import { init as initPhoneNumberGenerated } from "./publishers/phone-number-generated";

let amqp: AMQPClient;
let connection: AMQPBaseClient;

async function initPublishers(connection: AMQPBaseClient) {
  await initPhoneNumberGenerated(connection);
}

export async function init() {
  amqp = amqp = new AMQPClient(RABBITMQ_URI);
  connection = await amqp.connect();

  await initPublishers(connection);

  console.info(`connected to ${RABBITMQ_URI}`);
}

export async function deinit() {
  await connection.close();
  console.info(`closed connection to ${RABBITMQ_URI}`);
}
