// executed inside the browser
export const spy = (serverSocketUrl, haxballMessageInterceptedMessageType) => {
  const messagesContainer = document.querySelector(".chatbox-view .log.ps");
  let previousMessages = [];
  messagesContainer.addEventListener("DOMSubtreeModified", () => {
    const messages = [...messagesContainer.querySelectorAll("p")].map(
      (messageElement) => {
        const rawText = messageElement.outerText;
        const fromServer = messageElement.className.includes("notice");
        const sender =
          (!fromServer && rawText.slice(0, rawText.indexOf(":"))) || undefined;
        const text = fromServer
          ? rawText
          : rawText.slice(rawText.indexOf(":") + 1).trim();
        return { sender, text, fromServer };
      }
    );
    if (messages.length >= previousMessages.length) {
      const newMessage = messages[messages.length - 1];
      handleReceivedMessage(newMessage);
    }
    previousMessages = messages;
  });

  const ws = new WebSocket(serverSocketUrl);

  const handleReceivedMessage = (message) => {
    ws.send(
      JSON.stringify({
        type: haxballMessageInterceptedMessageType,
        payload: {
          message,
        },
      })
    );
  };
};
