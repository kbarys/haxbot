import * as callEveryone from "./callEveryone";

const PREFIX = "(?<prefix>(bot)|(haxbot)|(bocie))";

const COMMANDS = [callEveryone];

export const matchCommand = (text: string) => {
  const textLowerCase = text.toLowerCase();
  const matchedCommand = COMMANDS.find((command) => {
    const regex = `${PREFIX} +${command.regex}`;
    return textLowerCase.match(regex);
  });
  matchedCommand?.execute();
};
