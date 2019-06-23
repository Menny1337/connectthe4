import ConnectFour from "./services/gameService";
import Board from "./components/board/board";


// export default (gameElementId: string, boardWidth: number, boardHeight: number) => {
//     const game = new ConnectFour(gameElementId); // game logic
//     const boardUi = new Board(gameElementId); // game renderer
//     // starting new game
//     let gameBoard = game.startGame(boardWidth,boardHeight);
//     // drawing board for the first time and adding the event listeners
//     boardUi.initGameSurface(game,gameBoard);
// }

export default class Game {
    static game: ConnectFour;
    static boardUi: Board;

    constructor(gameElementId: string){
        Game.game = new ConnectFour(gameElementId); // game logic
        Game.boardUi = new Board(gameElementId); // game renderer
    }

    public startGame(boardWidth: number, boardHeight: number){
        // starting new game
        let gameBoard = Game.game.startGame(boardWidth,boardHeight);
        // drawing board for the first time and adding the event listeners
        Game.boardUi.initGameSurface(Game.game,gameBoard);
    }
}
