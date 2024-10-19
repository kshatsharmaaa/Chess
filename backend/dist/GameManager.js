"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameManager = void 0;
const messages_1 = require("./messages");
const Game_1 = require("./Game");
// User, Game Class
class GameManager {
    constructor() {
        this.games = [];
        this.pendingUser = null;
        this.users = [];
    }
    // functions
    addUser(socket) {
        this.users.push(socket); // we push this to the list of users
        this.addHandler(socket); // attaches two actions
    }
    removeUser(socket) {
        this.users = this.users.filter(user => user !== socket);
        // stop the game here because the user left
    }
    addHandler(socket) {
        socket.on("message", (data) => {
            const message = JSON.parse(data.toString());
            if (message.type === messages_1.INIT_GAME) {
                if (this.pendingUser) { //exists waiting to be connected to someone else
                    // start a game
                    const game = new Game_1.Game(this.pendingUser, socket);
                    this.games.push(game); // in array
                    this.pendingUser = null;
                }
                else {
                    this.pendingUser = socket; //create this user as a pending user
                }
            }
            if (message.type === messages_1.MOVE) { // game has already started
                const game = this.games.find(game => game.player1 === socket || game.player2 === socket);
                if (game) {
                    game.makeMove(socket, message.payload.move);
                }
            }
        });
    }
}
exports.GameManager = GameManager;
