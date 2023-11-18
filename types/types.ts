export type EnhancedNumber = {
  phoneNumber: string;
  country: string;
  mobile: boolean;
};

const MESSAGES = [
  "PHONE_NUMBER_GENERATED",
  "PHONE_NUMBER_ENHANCED",
  "PHONE_NUMBER_STORED",
] as const;

export type MessageName = (typeof MESSAGES)[number];

export const MESSAGE_IDS = MESSAGES.reduce((res, cur, index) => {
  res[cur] = index;
  return res;
}, {} as Record<MessageName, number>);

export const MESSAGE_NAMES = MESSAGES.reduce((res, cur, index) => {
  res[cur] = cur;
  return res;
}, {} as Record<MessageName, MessageName>);

export type PhoneNumberGeneratedBody = {
  phoneNumber: string;
};

export type PhoneNumberEnhancedBody = {
  enhancedPhoneNumber: EnhancedNumber;
};
