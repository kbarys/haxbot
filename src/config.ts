import { config as loadEnvironmentVariables } from "dotenv";

loadEnvironmentVariables();

const get = (
  name: string,
  { defaultValue }: { defaultValue?: string } = {}
) => {
  const value = process.env[name];
  if (value) {
    return value;
  }
  if (defaultValue) {
    return defaultValue;
  }
  throw new Error(`The '${name}' env var was not provided.`);
};

const boolean = (stringValue: string) => {
  return stringValue === "true";
};

export const CONFIG = {
  roomUrl: get("HAXBOT_HAXBALL_ROOM_URL"),
  roomPassword: get("HAXBOT_HAXBALL_ROOM_PASSWORD"),
  haxballUsername: get("HAXBOT_HAXBALL_USERNAME", { defaultValue: "🤖" }),
  messengerUsername: get("HAXBOT_MESSENGER_USERNAME"),
  messengerPassword: get("HAXBOT_MESSENGER_PASSWORD"),
  messengerThreadName: get("HAXBOT_MESSENGER_THREAD_NAME"),
  ci: boolean(get("HAXBOT_CI", { defaultValue: "true" })),
};
