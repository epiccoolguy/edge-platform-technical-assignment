// todo: receive EnhancedNumber and put into mongo

import * as Mongo from "./database/mongo";

async function init() {
  await Mongo.init();
}

async function deinit() {
  await Mongo.deinit();
}

process.on("beforeExit", deinit);
process.on("SIGINT", deinit);

(async function main() {
  await init();
})();
