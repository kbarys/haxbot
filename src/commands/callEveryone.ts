import * as Ui from "../ui/index";

export const regex = "(wolaj ludzi)|(wołaj ludzi)";

export const execute = async () => {
  await Ui.Messenger.sendMessage("Dawajcie na gierke! ⚽📯");
  await Ui.Haxball.sendMessage("👌");
};
