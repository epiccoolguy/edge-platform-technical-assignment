import crypto from "crypto";

import { LOWER_BOUND, UPPER_BOUND } from "../constants";

export function generatePhoneNumber(): string {
  const random = crypto.randomInt(LOWER_BOUND, UPPER_BOUND);
  return String(random);
}
