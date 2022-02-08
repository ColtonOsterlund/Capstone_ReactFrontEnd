const WebSocket = require("ws");
const wssPort = 8080;
const wss = new WebSocket.Server({ port: wssPort});

wss.on("connection", ws => {
    console.log("New client connected");


    ws.on("message", data => {
        console.log(`Client has sent: ${data}`);
    });

    ws.on("close", () => {
        console.log("Connection closed");
    });

});