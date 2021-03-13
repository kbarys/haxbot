import { config as loadEnvironmentVariables } from "dotenv";

loadEnvironmentVariables();

const optional = (val, defaultVal) => {
  return typeof val === "string" ? val : defaultVal;
};

const optionalBoolean = (stringVal, defaultVal) => {
  return stringVal ? stringVal === "true" : defaultVal;
};

export const CONFIG = {
  roomUrl: process.env.HAXBOT_HAXBALL_ROOM_URL,
  roomPassword: process.env.HAXBOT_HAXBALL_ROOM_PASSWORD,
  haxballUsername: optional(process.env.HAXBOT_HAXBALL_USERNAME, "🤖"),
  messengerUsername: process.env.HAXBOT_MESSENGER_USERNAME,
  messengerPassword: process.env.HAXBOT_MESSENGER_PASSWORD,
  messengerThreadName: process.env.HAXBOT_MESSENGER_THREAD_NAME,
  ci: optionalBoolean(process.env.HAXBOT_CI, true),
};
