import { getCountryName, isMobileNumber } from "./dictionary";

import { EnhancedNumber } from "types";

// todo: send this off to store

function addMetadata(phoneNumber: string): EnhancedNumber {
  const country = getCountryName(String(phoneNumber));
  const mobile = isMobileNumber(phoneNumber);

  return {
    phoneNumber,
    country,
    mobile,
  };
}
