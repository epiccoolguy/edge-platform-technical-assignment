import { AMQPChannel, AMQPQueue } from "@cloudamqp/amqp-client";
import { AMQPBaseClient } from "@cloudamqp/amqp-client/types/amqp-base-client";

import { MESSAGE_IDS, MESSAGE_NAMES, PhoneNumberGeneratedBody } from "types";

let channel: AMQPChannel;
let queue: AMQPQueue;

export async function init(connection: AMQPBaseClient): Promise<void> {
  channel = await connection.channel(MESSAGE_IDS.PHONE_NUMBER_GENERATED);
  queue = await channel.queue(MESSAGE_NAMES.PHONE_NUMBER_GENERATED);
}

export async function publish(phoneNumber: string): Promise<void> {
  if (!channel)
    throw new Error(`channel ${MESSAGE_IDS.PHONE_NUMBER_GENERATED} not opened`);

  if (!queue) {
    throw new Error(
      `queue ${MESSAGE_NAMES.PHONE_NUMBER_GENERATED} not declared`
    );
  }

  const body: PhoneNumberGeneratedBody = {
    phoneNumber,
  };

  await queue.publish(JSON.stringify(body));

  console.info(`published message with generated phone number ${phoneNumber}`);
}
