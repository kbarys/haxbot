import { createServer } from "https";
import { readFileSync } from "fs";
import WebSocket from "ws";

const PORT = 1331;
export const SERVER_SOCKET_URL = `wss://localhost:${PORT}`;

export const startServer = (onMessage) => {
  const server = createServer({
    key: readFileSync("./src/asset/key.pem"),
    cert: readFileSync("./src/asset/cert.pem"),
  });
  server.listen(PORT);
  const webSocketServer = new WebSocket.Server({ server });
  webSocketServer.on("connection", (webSocket) =>
    webSocket.on("message", function (message) {
      let parsedMessage;
      try {
        parsedMessage = JSON.parse(message);
      } catch (error) {
        console.error("Failed to parse the message", { message });
        return;
      }
      console.log("Got a message", { parsedMessage });
      onMessage(parsedMessage);
    })
  );
  webSocketServer.on("error", (error) => console.error(error));
};
