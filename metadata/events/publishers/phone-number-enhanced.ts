import { AMQPChannel, AMQPQueue } from "@cloudamqp/amqp-client";
import { AMQPBaseClient } from "@cloudamqp/amqp-client/types/amqp-base-client";

import {
  EnhancedNumber,
  MESSAGE_IDS,
  MESSAGE_NAMES,
  PhoneNumberEnhancedBody,
} from "types";

let channel: AMQPChannel;
let queue: AMQPQueue;

export async function init(connection: AMQPBaseClient): Promise<void> {
  channel = await connection.channel(MESSAGE_IDS.PHONE_NUMBER_ENHANCED);
  queue = await channel.queue(MESSAGE_NAMES.PHONE_NUMBER_ENHANCED);
}

export async function publish(
  enhancedPhoneNumber: EnhancedNumber
): Promise<void> {
  if (!channel)
    throw new Error(`channel ${MESSAGE_IDS.PHONE_NUMBER_ENHANCED} not opened`);

  if (!queue) {
    throw new Error(
      `queue ${MESSAGE_NAMES.PHONE_NUMBER_ENHANCED} not declared`
    );
  }

  const body: PhoneNumberEnhancedBody = {
    enhancedPhoneNumber,
  };

  await queue.publish(JSON.stringify(body));

  const { phoneNumber, country, mobile } = enhancedPhoneNumber;

  console.info(
    `published message with enhanced phone number ${phoneNumber} country: ${country} [mobile: ${mobile}]`
  );
}
