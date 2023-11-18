import { AMQPClient } from "@cloudamqp/amqp-client";
import { AMQPBaseClient } from "@cloudamqp/amqp-client/types/amqp-base-client";

import { RABBITMQ_URI } from "../constants";
import { init as createPhoneNumberGeneratedChannel } from "./publishers/phone-number-generated";

let amqp: AMQPClient;
let connection: AMQPBaseClient;

async function createChannels(connection: AMQPBaseClient) {
  await createPhoneNumberGeneratedChannel(connection);
}

export async function init() {
  amqp = amqp = new AMQPClient(RABBITMQ_URI);
  connection = await amqp.connect();

  await createChannels(connection);

  console.info(`connected to ${RABBITMQ_URI}`);
}

export async function deinit() {
  await connection.close();
  console.info(`closed connection to ${RABBITMQ_URI}`);
}
