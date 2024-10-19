"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const GameManager_1 = require("./GameManager");
const wss = new ws_1.WebSocketServer({ port: 8080 });
const gameManager = new GameManager_1.GameManager(); // initialises a game manager 
wss.on('connection', function connection(ws) {
    gameManager.addUser(ws); // anytime a user connects, we add user to it
    ws.on("disconnect", () => gameManager.removeUser(ws)); // anytime a user disconnects we remove the user
});
