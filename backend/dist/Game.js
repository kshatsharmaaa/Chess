"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
const chess_js_1 = require("chess.js");
const messages_1 = require("./messages");
class Game {
    constructor(player1, player2) {
        this.moveCount = 0;
        this.player1 = player1;
        this.player2 = player2;
        this.board = new chess_js_1.Chess();
        this.startTime = new Date();
        this.player1.send(JSON.stringify({
            type: messages_1.INIT_GAME,
            payload: {
                color: "white"
            }
        }));
        this.player2.send(JSON.stringify({
            type: messages_1.INIT_GAME,
            payload: {
                color: "black"
            }
        }));
    }
    makeMove(socket, move) {
        // validate the type of move using zod
        // validation here
        // Is it this users move
        // Is the move valid
        if (this.moveCount % 2 === 0 && socket !== this.player1) { //player 2 is trying to make a move
            return;
        }
        if (this.moveCount % 2 === 1 && socket !== this.player2) { //player 1 is trying to make a move
            return;
        }
        try {
            this.board.move(move); // chess.js will handle it
        }
        catch (e) {
            console.log(e);
            return;
        }
        if (this.board.isGameOver()) {
            // Send the game over message to both players
            this.player1.emit(JSON.stringify({
                type: messages_1.GAME_OVER,
                payload: {
                    winner: this.board.turn() === "w" ? "black" : "white"
                }
            }));
            this.player2.emit(JSON.stringify({
                type: messages_1.GAME_OVER,
                payload: {
                    winner: this.board.turn() === "w" ? "black" : "white"
                }
            }));
            return;
        }
        //that the move has been made
        if (this.moveCount % 2 === 0) {
            this.player2.send(JSON.stringify({
                type: messages_1.MOVE,
                payload: move
            }));
        }
        else {
            this.player1.send(JSON.stringify({
                type: messages_1.MOVE,
                payload: move
            }));
        }
        // Update the board
        // Push the move
        // Check if the game is over
        // Send the updated board to both players 
        // library is handling all of this for us
        this.moveCount++; // anytime if there's a valid move
    }
}
exports.Game = Game;
