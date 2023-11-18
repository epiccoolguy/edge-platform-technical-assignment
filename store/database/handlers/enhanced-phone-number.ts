import { EnhancedNumber } from "types";
import { EnhancedPhoneNumber } from "../models/enhanced-phone-number";

export async function store(doc: EnhancedNumber) {
  await EnhancedPhoneNumber.create(doc);
}
