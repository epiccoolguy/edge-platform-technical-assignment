import { getCountryName, isMobileNumber } from "./dictionary";

type EnhancedNumber = {
  phoneNumber: string;
  country: string;
  mobile: boolean;
};

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
