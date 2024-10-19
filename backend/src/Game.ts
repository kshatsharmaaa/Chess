import { WebSocket } from "ws";
import { Chess } from 'chess.js'
import { GAME_OVER, INIT_GAME, MOVE } from "./messages";

export class Game{
    public player1: WebSocket; 
    public player2: WebSocket;
    private board: Chess;
    private startTime: Date;
    private moveCount = 0;

    constructor(player1: WebSocket, player2: WebSocket) {
        this.player1 = player1;
        this.player2 = player2;
        this.board = new Chess();
        this.startTime = new Date();
        this.player1.send(JSON.stringify({
            type: INIT_GAME,
            payload: {
                color: "white"
            }
        }));
        this.player2.send(JSON.stringify({
            type: INIT_GAME,
            payload: {
                color: "black"
            }
        }));
    }

    makeMove(socket: WebSocket, move: {
        from: string;
        to: string;
    }) {
        // validate the type of move using zod
        // validation here
        // Is it this users move
        // Is the move valid

        if(this.moveCount % 2 === 0 && socket !== this.player1) { //player 2 is trying to make a move
            return;
        }
        if(this.moveCount % 2 === 1 && socket !== this.player2) { //player 1 is trying to make a move
            return;
        }

        try {
            this.board.move(move); // chess.js will handle it
            
        } catch(e) {
            console.log(e);
            return;
        }
        
        if(this.board.isGameOver()) {
            // Send the game over message to both players
            this.player1.emit(JSON.stringify({
                type: GAME_OVER,
                payload: {
                    winner: this.board.turn() === "w" ? "black" : "white"
                }
            }))
            this.player2.emit(JSON.stringify({
                type: GAME_OVER,
                payload: {
                    winner: this.board.turn() === "w" ? "black" : "white"
                }
            }))
            return;
        }

        //that the move has been made
        if(this.moveCount % 2 === 0) {
            this.player2.send(JSON.stringify({
                type: MOVE,
                payload: move
            }))
        } else {
            this.player1.send(JSON.stringify({
                type: MOVE,
                payload: move
            }))
        }

        // Update the board
        // Push the move

        // Check if the game is over

        // Send the updated board to both players 




        // library is handling all of this for us
        this.moveCount++; // anytime if there's a valid move
    }
}