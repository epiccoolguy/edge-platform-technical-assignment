import crypto from "crypto";

const lowerBound = 10000000000;
const upperBound = 999999999999;

// todo: send this off to metadata
const random = crypto.randomInt(lowerBound, upperBound);

console.log(Number.isSafeInteger(lowerBound));
console.log(Number.isSafeInteger(upperBound));
console.log(random);
