import { By, Key, until, Builder, WebDriver } from "selenium-webdriver";
import { Options } from "selenium-webdriver/chrome";

import { CONFIG } from "../config";
import { logLogsFromBrowser, inputText } from "./utils";

let driver: WebDriver;

export const setupChromeDriver = async () => {
  const chromeOptions = new Options()
    .windowSize({ width: 950, height: 1024 })
    .addArguments("--ignore-certificate-errors", "--disable-dev-shm-usage");
  driver = await new Builder()
    .forBrowser("chrome")
    .setChromeOptions(chromeOptions)
    .build();
  logLogsFromBrowser(driver);
};

export const openMessenger = async () => {
  await driver.get("https://www.messenger.com/");
};

export const acceptCookies = async () => {
  try {
    const ACCEPT_COOKIES_BUTTON_CSS_SELECTOR =
      "button[data-testid='cookie-policy-dialog-accept-button']";

    const acceptCookiesButton = await driver.wait(
      until.elementLocated(By.css(ACCEPT_COOKIES_BUTTON_CSS_SELECTOR)),
      2000,
      "Cookies dialog not present, skipping..."
    );
    acceptCookiesButton.click();
  } catch {}
};

export const login = async () => {
  const USERNAME_INPUT_CSS_SELECTOR = "input[type='text']";
  const PASSWORD_INPUT_CSS_SELECTOR = "input[type='password']";

  console.log("Trying to log in to Messenger with", {
    username: CONFIG.messengerUsername,
    password: CONFIG.messengerPassword,
  });
  const usernameInput = await driver.findElement(
    By.css(USERNAME_INPUT_CSS_SELECTOR)
  );
  await usernameInput.sendKeys(CONFIG.messengerUsername);
  const passwordInput = await driver.findElement(
    By.css(PASSWORD_INPUT_CSS_SELECTOR)
  );
  await passwordInput.sendKeys(CONFIG.messengerPassword, Key.ENTER);
  await driver.wait(until.elementLocated(By.xpath("//*[text()='Czaty']")));
};

export const selectThread = async () => {
  const threadElementXPath = `//div[@data-testid='mwthreadlist-item']//*[text()="${CONFIG.messengerThreadName}"]`;
  const threadElement = await driver.findElement(By.xpath(threadElementXPath));
  threadElement.click();
  const threadMainElementXPath = `//*[@role='main' and contains(@aria-label, '${CONFIG.messengerThreadName}')]`;
  await driver.wait(until.elementLocated(By.xpath(threadMainElementXPath)));
};

export const sendMessage = async (message: string) => {
  const textBox = driver.findElement(By.xpath("//*[@role='textbox']"));
  await inputText({ element: textBox, text: message });
};

export const closeChromeDriver = () => {
  driver.close();
};
