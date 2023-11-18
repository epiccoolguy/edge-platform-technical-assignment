import { EnhancedNumber } from "types";

import Mongoose from "mongoose";

const schema = new Mongoose.Schema<EnhancedNumber>({
  phoneNumber: String,
  country: String,
  mobile: Boolean,
});

export const EnhancedPhoneNumber = Mongoose.model(
  "EnhancedPhoneNumber",
  schema
);
