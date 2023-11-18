import { AMQPClient } from "@cloudamqp/amqp-client";
import { RABBITMQ_URI } from "../constants";
import { AMQPBaseClient } from "@cloudamqp/amqp-client/types/amqp-base-client";

let amqp: AMQPClient;
let connection: AMQPBaseClient;

export async function init() {
  amqp = amqp = new AMQPClient(RABBITMQ_URI);
  connection = await amqp.connect();
  console.info(`connected to ${RABBITMQ_URI}`);
}

export async function deinit() {
  await connection.close();
  console.info(`closed connection to ${RABBITMQ_URI}`);
}
