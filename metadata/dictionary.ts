import CountryCodeToName from "./country-codes.json";
import CountryCodeToMobilePrefixes from "./mobile-prefixes.json";

const countryCodes = Object.keys(CountryCodeToName);

function findFirstSubstring(str: string, subs: string[]): string | undefined {
  for (const sub of subs) {
    if (str.startsWith(sub)) {
      return sub;
    }
  }
}

function getCountryCode(phoneNumber: string): string {
  return findFirstSubstring(phoneNumber, countryCodes) || "";
}

export function getCountryName(phoneNumber: string): string {
  const countryCode = getCountryCode(phoneNumber);

  const countryName: string | undefined = CountryCodeToName[countryCode];

  return countryName || "Unknown";
}

export function isMobileNumber(phoneNumber: string): boolean {
  const countryCode = getCountryCode(phoneNumber);

  const mobilePrefixes: string[] | undefined =
    CountryCodeToMobilePrefixes[countryCode];

  if (!mobilePrefixes) {
    return false;
  }

  const remainingPhoneNumber = phoneNumber.slice(countryCode.length);

  const mobilePrefix = findFirstSubstring(remainingPhoneNumber, mobilePrefixes);

  return Boolean(mobilePrefix);
}
