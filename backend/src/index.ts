
import { WebSocketServer } from 'ws';
import { GameManager } from './GameManager';

const wss = new WebSocketServer({ port: 8080 });

const gameManager = new GameManager(); // initialises a game manager 

wss.on('connection', function connection(ws) {
    gameManager.addUser(ws); // anytime a user connects, we add user to it
    ws.on("disconnect", () => gameManager.removeUser(ws)); // anytime a user disconnects we remove the user
});