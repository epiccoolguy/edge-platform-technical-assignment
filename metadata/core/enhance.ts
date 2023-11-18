import { EnhancedNumber } from "types";
import { getCountryName, isMobileNumber } from "./dictionary";

export function addMetadata(phoneNumber: string): EnhancedNumber {
  const country = getCountryName(String(phoneNumber));
  const mobile = isMobileNumber(phoneNumber);

  return {
    phoneNumber,
    country,
    mobile,
  };
}
