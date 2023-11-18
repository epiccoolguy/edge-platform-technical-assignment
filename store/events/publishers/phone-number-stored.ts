import { AMQPChannel, AMQPQueue } from "@cloudamqp/amqp-client";
import { AMQPBaseClient } from "@cloudamqp/amqp-client/types/amqp-base-client";

import {
  EnhancedNumber,
  MESSAGE_IDS,
  MESSAGE_NAMES,
  PhoneNumberStoredBody,
} from "types";

let channel: AMQPChannel;
let queue: AMQPQueue;

export async function init(connection: AMQPBaseClient): Promise<void> {
  channel = await connection.channel(MESSAGE_IDS.PHONE_NUMBER_STORED);
  queue = await channel.queue(MESSAGE_NAMES.PHONE_NUMBER_STORED);
}

export async function publish(
  storedPhoneNumber: EnhancedNumber
): Promise<void> {
  if (!channel)
    throw new Error(`channel ${MESSAGE_IDS.PHONE_NUMBER_STORED} not opened`);

  if (!queue) {
    throw new Error(`queue ${MESSAGE_NAMES.PHONE_NUMBER_STORED} not declared`);
  }

  const body: PhoneNumberStoredBody = {
    storedPhoneNumber,
  };

  await queue.publish(JSON.stringify(body));

  const { phoneNumber, country, mobile } = storedPhoneNumber;

  console.info(
    `published message with stored phone number ${phoneNumber} country: ${country} [mobile: ${mobile}]`
  );
}
