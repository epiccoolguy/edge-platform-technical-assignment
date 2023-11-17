import Mongoose from "mongoose";
import { MONGO_URI } from "../constants";

export async function init() {
  await Mongoose.connect(MONGO_URI);
  console.info(`connected to ${MONGO_URI}`);
}

export async function deinit() {
  await Mongoose.connection.close();
  console.info(`closed connection to ${MONGO_URI}`);
}
