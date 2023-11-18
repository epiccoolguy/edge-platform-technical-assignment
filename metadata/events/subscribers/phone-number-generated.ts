import { AMQPChannel, AMQPMessage, AMQPQueue } from "@cloudamqp/amqp-client";
import { AMQPBaseClient } from "@cloudamqp/amqp-client/types/amqp-base-client";

import { MESSAGE_IDS, MESSAGE_NAMES, PhoneNumberGeneratedBody } from "types";
import { addMetadata } from "../../core/enhance";
import { publish as publishEnhancedPhoneNumber } from "../publishers/phone-number-enhanced";

let channel: AMQPChannel;
let queue: AMQPQueue;

async function subscribe(message: AMQPMessage): Promise<void> {
  const bodyString = message.bodyToString();

  if (!bodyString) throw new Error(`message has no body`);

  const body: PhoneNumberGeneratedBody = JSON.parse(bodyString);

  console.info(
    `received message with generated phone number ${body.phoneNumber}`
  );

  try {
    const enhancedPhoneNumber = addMetadata(body.phoneNumber);

    await publishEnhancedPhoneNumber(enhancedPhoneNumber);
  } catch (error) {
    if (error instanceof Error && error.message === "Undefined Country Code") {
      await message.nack(false);
      console.warn(`${body.phoneNumber} is not a phone number: ${error}`);
    } else {
      throw error;
    }
  }
}

export async function init(connection: AMQPBaseClient): Promise<void> {
  channel = await connection.channel(MESSAGE_IDS.PHONE_NUMBER_GENERATED);
  queue = await channel.queue(MESSAGE_NAMES.PHONE_NUMBER_GENERATED);

  await queue.subscribe({ noAck: false }, subscribe);
}
