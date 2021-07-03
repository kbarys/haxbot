import XVirtualFrameBuffer from "xvfb";

import * as Ui from "./ui";
import * as Socket from "./socket";
import * as Message from "./message";
import { matchCommand } from "./commands/index";
import { CONFIG } from "./config";

let xVirtualFrameBuffer: XVirtualFrameBuffer;

const main = async () => {
  Socket.startServer(handleMessage);
  if (CONFIG.ci) {
    xVirtualFrameBuffer = new XVirtualFrameBuffer({
      innerWidth: 1024,
      innerHeight: 1024,
    });
    xVirtualFrameBuffer.startSync();
  }
  await setupHaxball();
  await setupMessenger();
  await Ui.Haxball.spyOnChat();
};

const setupHaxball = async () => {
  await Ui.Haxball.setupChromeDriver();
  await Ui.Haxball.openHaxball();
  await Ui.Haxball.enterNickname();
  await Ui.Haxball.enterPasswordRoom();
  await Ui.Haxball.setupMessageModule();
};

const setupMessenger = async () => {
  await Ui.Messenger.setupChromeDriver();
  await Ui.Messenger.openMessenger();
  await Ui.Messenger.acceptCookies();
  await Ui.Messenger.login();
  await Ui.Messenger.selectThread();
};

const handleMessage = (message: any) => {
  if (Message.haxballUserMessageIntercepted.match(message)) {
    matchCommand(message.payload.messageText);
  } else {
    console.log("Got an unknown message", message);
  }
};

process.on("beforeExit", () => {
  Ui.Messenger.closeChromeDriver();
  Ui.Haxball.closeChromeDriver();
  if (CONFIG.ci) {
    xVirtualFrameBuffer.stopSync();
  }
});

main();
