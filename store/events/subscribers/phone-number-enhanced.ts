import { AMQPChannel, AMQPMessage, AMQPQueue } from "@cloudamqp/amqp-client";
import { AMQPBaseClient } from "@cloudamqp/amqp-client/types/amqp-base-client";

import { MESSAGE_IDS, MESSAGE_NAMES, PhoneNumberEnhancedBody } from "types";
import { store } from "../../database/handlers/enhanced-phone-number";
import { publish as publishStoredPhoneNumber } from "../publishers/phone-number-stored";

let channel: AMQPChannel;
let queue: AMQPQueue;

async function subscribe(message: AMQPMessage): Promise<void> {
  const bodyString = message.bodyToString();

  if (!bodyString) throw new Error(`message has no body`);

  const body: PhoneNumberEnhancedBody = JSON.parse(bodyString);

  const { phoneNumber, country, mobile } = body.enhancedPhoneNumber;

  console.info(
    `received message with enhanced phone number ${phoneNumber} country: ${country} [mobile: ${mobile}]`
  );

  await store(body.enhancedPhoneNumber);

  await publishStoredPhoneNumber(body.enhancedPhoneNumber);
}

export async function init(connection: AMQPBaseClient): Promise<void> {
  channel = await connection.channel(MESSAGE_IDS.PHONE_NUMBER_GENERATED);
  queue = await channel.queue(MESSAGE_NAMES.PHONE_NUMBER_GENERATED);

  await queue.subscribe({ noAck: false }, subscribe);
}
