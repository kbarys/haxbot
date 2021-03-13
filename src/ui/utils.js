import { write as writeToClipboard } from "clipboardy";
import { logging, Key } from "selenium-webdriver";

export const logLogsFromBrowser = (driver) => {
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

export const inputText = async ({ element, text }) => {
  await writeToClipboard(text);
  if (process.platform === "darwin") {
    await element.sendKeys(Key.COMMAND, "v", Key.ENTER);
  } else {
    await element.sendKeys(Key.CONTROL, "v", Key.ENTER);
  }
};
