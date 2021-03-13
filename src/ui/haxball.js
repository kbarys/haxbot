import { By, Key, until, Builder } from "selenium-webdriver";
import { Options } from "selenium-webdriver/chrome.js";

import * as ChatSpy from "./haxball-chat-spy.js";
import * as Message from "../message.js";
import { CONFIG } from "../config.js";
import { SERVER_SOCKET_URL } from "../socket.js";
import { logLogsFromBrowser, inputText } from "./utils.js";

let driver;

export const setupChromeDriver = async () => {
  const chromeOptions = new Options()
    .windowSize({ width: 1024, height: 1024 })
    .addArguments(["--ignore-certificate-errors", "--disable-dev-shm-usage"]);
  driver = await new Builder()
    .forBrowser("chrome")
    .setChromeOptions(chromeOptions)
    .build();
  logLogsFromBrowser(driver);
};

export const openHaxball = async () => {
  await driver.get(CONFIG.roomUrl);
  await driver.wait(until.ableToSwitchToFrame(By.css(".gameframe")));
};

export const enterNickname = async () => {
  const NICKNAME_INPUT_CSS_SELECTOR = ".choose-nickname-view input";

  const nicknameInput = await driver.wait(
    until.elementLocated(By.css(NICKNAME_INPUT_CSS_SELECTOR))
  );
  await inputText({ element: nicknameInput, text: CONFIG.haxballUsername });
};

export const enterPasswordRoom = async () => {
  await driver.wait(until.elementLocated(By.css(".room-password-view")));
  const passwordInput = await driver.findElement(
    By.css(".room-password-view .label-input input")
  );
  await passwordInput.sendKeys(CONFIG.roomPassword, Key.ENTER);
};

export const spyOnChat = async () => {
  await driver.wait(until.elementLocated(By.css(".chatbox-view")));
  await driver.executeScript(
    ChatSpy.spy,
    SERVER_SOCKET_URL,
    Message.haxballMessageIntercepted.type
  );
};

export const sendMessage = async (text) => {
  const chatInput = driver.findElement(By.css(".chatbox-view div.input input"));
  await inputText({ element: chatInput, text });
};

export const closeChromeDriver = () => {
  driver.close();
};
