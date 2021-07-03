import * as Message from "../message"; // only for type checking

// executed inside the browser
export const spy = (serverSocketUrl: string) => {
  const interceptChatMessages = () => {
    const webSocket = new WebSocket(serverSocketUrl);
    const messagesContainer = document.querySelector(".chatbox-view .log.ps");
    let previousMessages: NodeListOf<HTMLParagraphElement> | undefined;
    messagesContainer?.addEventListener("DOMSubtreeModified", () => {
      const messages = messagesContainer.querySelectorAll("p");
      if (!previousMessages || messages.length >= previousMessages.length) {
        const messageElement = messages[messages.length - 1];
        const fromServer = messageElement.className.includes("notice");
        const text = messageElement.innerText;
        fromServer ? handleServerMessage(text) : handleUserMessage(text);
      }
      previousMessages = messages;
    });

    const handleUserMessage = (rawMessage: string) => {
      webSocket.send(JSON.stringify({ rawMessage }));
      const matchedGroups = rawMessage.match(
        /(?<username>.*?): (?<message>.*)/
      )?.groups;
      if (matchedGroups) {
        const { username, message } = matchedGroups;
        webSocket.send(
          JSON.stringify(
            Message.haxballUserMessageIntercepted({
              username,
              messageText: message,
            })
          )
        );
      }
    };

    const handleServerMessage = (rawMessage: string) => {};
  };

  interceptChatMessages();
};
