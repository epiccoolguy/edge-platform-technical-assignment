import CountryCodeToName from "./country-codes.json";
import CountryCodeToMobilePrefixes from "./mobile-prefixes.json";

export type CountryCode = keyof typeof CountryCodeToName;
export type CountryCodesWithMobilePrefixes = Extract<
  CountryCode,
  keyof typeof CountryCodeToMobilePrefixes
>;

const countryCodes = Object.keys(CountryCodeToName) as CountryCode[];

function findFirstSubstring<S extends string = string>(
  str: string,
  subs: S[]
): S | undefined {
  for (const sub of subs) {
    if (str.startsWith(sub)) {
      return sub;
    }
  }
}

function getCountryCode(phoneNumber: string): CountryCode {
  const countryCode = findFirstSubstring<CountryCode>(
    phoneNumber,
    countryCodes
  );

  if (countryCode === undefined) {
    throw new Error("Undefined Country Code");
  }

  return countryCode;
}

export function getCountryName(phoneNumber: string): string {
  const countryCode = getCountryCode(phoneNumber);

  if (countryCode === undefined) {
    throw new Error("Undefined Country Code");
  }

  const countryName: string | undefined = CountryCodeToName[countryCode];

  return countryName || "Unknown";
}

export function isMobileNumber(phoneNumber: string): boolean {
  const countryCode = getCountryCode(phoneNumber);

  if (
    !CountryCodeToMobilePrefixes[countryCode as CountryCodesWithMobilePrefixes]
  ) {
    return false;
  }

  const mobilePrefixes: string[] =
    CountryCodeToMobilePrefixes[countryCode as CountryCodesWithMobilePrefixes];

  const remainingPhoneNumber = phoneNumber.slice(countryCode.length);

  const mobilePrefix = findFirstSubstring(remainingPhoneNumber, mobilePrefixes);

  return Boolean(mobilePrefix);
}
