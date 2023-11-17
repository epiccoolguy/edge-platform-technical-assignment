import { describe, expect, test } from "@jest/globals";
import { randomInt } from "crypto";

import CountryCodeToName from "./country-codes.json";
import CountryCodeToMobilePrefixes from "./mobile-prefixes.json";
import { getCountryName, isMobileNumber } from "./dictionary";

const upperBound = 999999999999;

describe("getCountryName", () => {
  for (const [countryCode, countryName] of Object.entries(CountryCodeToName)) {
    test(`finds ${countryName} (${countryCode})`, () => {
      const padding = String(randomInt(upperBound));
      const phoneNumber = countryCode.padEnd(12, padding);

      const result = getCountryName(phoneNumber);

      expect(result).toStrictEqual(countryName);
    });
  }
});

describe("isMobileNumber", () => {
  for (const [countryCode, countryName] of Object.entries(CountryCodeToName)) {
    const mobilePrefixes: string[] | undefined =
      CountryCodeToMobilePrefixes[countryCode];

    if (mobilePrefixes) {
      for (const mobilePrefix of mobilePrefixes) {
        test(`returns true for ${countryName} (${countryCode}${mobilePrefix})`, () => {
          const padding = String(randomInt(upperBound));
          const phoneNumber = `${countryCode}${mobilePrefix}`.padEnd(
            12,
            padding
          );

          const result = isMobileNumber(phoneNumber);

          expect(result).toStrictEqual(true);
        });
      }
    } else {
      test(`returns false for ${countryName} (no mobile prefix)`, () => {
        const padding = String(randomInt(upperBound));
        const phoneNumber = countryCode.padEnd(12, padding);

        const result = isMobileNumber(phoneNumber);

        expect(result).toStrictEqual(false);
      });
    }
  }
});
