const WebSocket = require("ws");
const wssPort = 8080;
const wss = new WebSocket.Server({ port: wssPort });

wss.on("connection", ws => {
    console.log("New client connected");


    ws.on("message", data => {
        console.log(`Client has sent: ${data}`);
        switch (data) {
            case "0x01":
                ws.send("Available");
                console.log("Sent Available");
                break;

            case "0x02":
                ws.send("Box stats");
                console.log("Box stats");
                break;

            case "0x03":
                ws.send("A, B, C");
                console.log("Box types: A, B, C");
                break;
            // ws.send("Box stats");
        }
    });

    ws.on("close", () => {
        console.log("Connection closed");
    });

});