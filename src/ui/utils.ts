import { write as writeToClipboard } from "clipboardy";
import { logging, Key, WebElement, WebDriver } from "selenium-webdriver";

export const logLogsFromBrowser = (driver: WebDriver) => {
  driver
    .manage()
    .logs()
    .get(logging.Type.BROWSER)
    .then(function (entries) {
      entries.forEach(function (entry) {
        console.log("[%s] %s", entry.level.name, entry.message);
      });
    });
};

export const inputText = async ({
  element,
  text,
}: {
  element: WebElement;
  text: string;
}) => {
  await writeToClipboard(text);
  if (process.platform === "darwin") {
    await element.sendKeys(Key.COMMAND, "v", Key.ENTER);
  } else {
    await element.sendKeys(Key.CONTROL, "v", Key.ENTER);
  }
};
