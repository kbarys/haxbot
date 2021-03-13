import Xvfb from "xvfb";

import * as Ui from "./ui/index.js";
import * as Socket from "./socket.js";
import * as Message from "./message.js";
import { matchCommand } from "./commands/index.js";
import { CONFIG } from "./config.js";

let xvfb;

const main = async () => {
  Socket.startServer((message) => {
    switch (message.type) {
      case Message.haxballMessageIntercepted.type:
        analyzeInterceptedMessage(message.payload.message);
        break;
    }
  });
  if (CONFIG.ci) {
    xvfb = new Xvfb({ innerWidth: 1024, innerWidth: 1024 });
    xvfb.startSync();
  }
  await setupHaxball();
  await setupMessenger();
};

const setupHaxball = async () => {
  await Ui.Haxball.setupChromeDriver();
  await Ui.Haxball.openHaxball();
  await Ui.Haxball.enterNickname();
  await Ui.Haxball.enterPasswordRoom();
  await Ui.Haxball.spyOnChat();
};

const setupMessenger = async () => {
  await Ui.Messenger.setupChromeDriver();
  await Ui.Messenger.openMessenger();
  await Ui.Messenger.acceptCookies();
  await Ui.Messenger.login();
  await Ui.Messenger.selectThread();
};

const analyzeInterceptedMessage = (message) => {
  if (!message.fromServer) {
    matchCommand(message.text);
  }
};

process.on("beforeExit", () => {
  Ui.Messenger.closeChromeDriver();
  Ui.Haxball.closeChromeDriver();
  if (CONFIG.ci) {
    xvfb.stopSync();
  }
});

main();
