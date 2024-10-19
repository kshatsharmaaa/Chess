import { WebSocket } from "ws";
import { INIT_GAME, MOVE } from "./messages";
import { Game } from "./Game";

// User, Game Class

export class GameManager {
    private games: Game[]; // variable Game
    private pendingUser: WebSocket | null;
    private users: WebSocket[];

    constructor() {
        this.games = [];
        this.pendingUser = null;
        this.users = [];
    }
    // functions
    addUser(socket: WebSocket) {
        this.users.push(socket); // we push this to the list of users
        this.addHandler(socket); // attaches two actions
    }

    removeUser(socket: WebSocket) {
        this.users = this.users.filter(user => user !== socket);
        // stop the game here because the user left
    }

    private addHandler(socket : WebSocket) {
        socket.on("message", (data) => {
            const message = JSON.parse(data.toString());
            
            if(message.type === INIT_GAME) {
                if(this.pendingUser) { //exists waiting to be connected to someone else
                    // start a game
                    const game = new Game(this.pendingUser, socket);
                    this.games.push(game); // in array
                    this.pendingUser = null;
                } else{
                    this.pendingUser = socket; //create this user as a pending user
                }
            }

            if(message.type === MOVE) { // game has already started
                const game = this.games.find(game => game.player1 === socket || game.player2 === socket);
                if(game) {
                    game.makeMove(socket, message.payload.move);
                }
            }
        })
    }
}
