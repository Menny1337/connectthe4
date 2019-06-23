const PLAYER_1 = 1;
const PLAYER_2 = 2;

type board = any|number[][];
type Point = {
    x: number,
    y: number
};

export default class ConnectFour {
    public currentPlayer: number;
    public boardWidth: number;
    public boardHeight: number;
    private board: board;
    private moveList: Point[];
    readonly gameElementId: string;

    public constructor(gameElementId){
        this.currentPlayer = PLAYER_1;
        this.gameElementId = gameElementId;
    }

    public startGame(boardWidth, boardHeight) {
        boardWidth = boardWidth >= 5 ? boardWidth : 5;
        boardHeight = boardHeight >= 5 ? boardHeight : 5;

        console.log(`starting game! ${boardHeight} ${boardWidth}`);
        this.boardWidth = boardWidth;
        this.boardHeight = boardHeight;
        // initialing board
        this.board = ConnectFour.initBoard(this.boardWidth, this.boardHeight);
        this.moveList = [];
        return this.board;
    }

    public static initBoard(boardWidth, boardHeight){
        const board = [];
        for (let i=0;i<boardWidth;i++) {
            board[i] = Array.from({ length: boardHeight }, () => null);
        }
        return board;
    }

    public makeMove(row: number): boolean{
        const boardHeight = this.boardHeight;
        // check if we can make the move
        const lastCell = this.board[row][boardHeight - 1];
        if(lastCell !== null){ // if lest cell is not empty therefore the move is illegal
            return false;
        }

        // inserting point in the first place free in the row
        let i = 0;
        for(i; i < this.board[row].length; i++){
            if(this.board[row][i] == null) {
                this.board[row][i] = this.currentPlayer;
                break;
            }
        }
        // saving the move in the move list
        this.moveList.push({x: row,y: i});
        // toggling player
        this.currentPlayer = ConnectFour.togglePlayer(this.currentPlayer);

        return this.board;
    }

    public checkBoard(){
        for(let i = 0; i < this.moveList.length; i++){
            let winner = this.checkPoint(this.moveList[i]);
            if(winner) return winner;
        }
        return false;
    }

    public checkPoint(point: Point){
        // checking if row is solved
        let winner = this.checkRow(point);
        if(winner) return winner;
        // checking if line is solved
        winner = this.checkLine(point);
        if(winner) return winner;
        // checking if Zig is solved
        winner = this.checkZig(point);
        if(winner) return winner;
        // checking if Zag is solved
        winner = this.checkZag(point);
        if(winner) return winner;
        return false;
    }

    public checkRow(point: Point){
        const pointPlayer = this.board[point.x][point.y];
        if(point.y + 3 > this.boardWidth){ // stopping over flow array errors
            return false;
        }

        if( (pointPlayer === this.board[point.x][point.y + 1]) &&
            (pointPlayer === this.board[point.x][point.y + 2]) &&
            (pointPlayer === this.board[point.x][point.y + 3])
        ) {
            return pointPlayer;
        }
        return false;
    }

    public checkLine(point: Point){
        const pointPlayer = this.board[point.x][point.y];
        if(point.x + 3 > this.boardHeight){ // stopping over flow array errors
            return false;
        }

        if( (pointPlayer === this.board[point.x + 1][point.y]) &&
            (pointPlayer === this.board[point.x + 2][point.y]) &&
            (pointPlayer === this.board[point.x + 3][point.y])
        ) {
            return pointPlayer;
        }
        return false;
    }

    public checkZig(point: Point){
        const pointPlayer = this.board[point.x][point.y];
        if(point.x + 3 > this.boardHeight || point.y + 3 > this.boardWidth){ // stopping over flow array errors
            return false;
        }

        if( (pointPlayer === this.board[point.x + 1][point.y + 1]) &&
            (pointPlayer === this.board[point.x + 2][point.y + 2]) &&
            (pointPlayer === this.board[point.x + 3][point.y + 3])
        ) {
            return pointPlayer;
        }
        return false;
    }

    public checkZag(point: Point){
        const pointPlayer = this.board[point.x][point.y];
        if(point.x + 3 > this.boardHeight || point.y - 3 < 0){ // stopping over flow array errors
            return false;
        }

        if( (pointPlayer === this.board[point.x + 1][point.y - 1]) &&
            (pointPlayer === this.board[point.x + 2][point.y - 2]) &&
            (pointPlayer === this.board[point.x + 3][point.y - 3])
        ) {
            return pointPlayer;
        }
        return false;
    }

    public static togglePlayer(currentPlayer: number): number{
        return (currentPlayer == PLAYER_1) ? PLAYER_2 : PLAYER_1;
    }
}
