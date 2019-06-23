
export default class Board {
    public boardElement: HTMLElement;

    public constructor(boardElementId: string){
        this.boardElement = document.getElementById(boardElementId);
    }

    public initGameSurface(game, board){
        this.drawBoard(board);
        this.initGameControls(game);
    }

    public initGameControls(game){
        document.body.onclick = (event) => {
            const element = event.target as HTMLElement;
            const rowElement = element.closest(".row");
            if(null !== rowElement){

                const gameBoard = game.makeMove(parseInt(rowElement.id));

                if(gameBoard){
                    this.drawBoard(gameBoard);
                    let winningPlayer = game.checkBoard();
                    if(winningPlayer){
                        console.log(`winner! game over. player ${winningPlayer} won!`);
                        // end game
                        alert(`Winner! Game Over. Player ${winningPlayer} Wins!`);
                        document.body.onclick = ()=>{};
                    }
                } else {
                    alert("cant move there!")
                }
            }
        };
    }

    public drawBoard(board: number[][]): void {
        const rowsOfLines = board.map((row,rowId) => {
            return row.map( (cell,lineId) => {
                return `<div class="square-con">
    <div class="square row-${rowId} line-${lineId}" id="square-${rowId}-${lineId}">
        <span class="player-${cell}"></span>
    </div>
</div>`;
            }).reduce((line, cell) => {
                return line+cell;
            });
        }).reduce((rows, row, rowId) => {
            return `${rows}<div class="row" id="${rowId}">${row}</div>`;
        },"");
        this.boardElement.innerHTML = rowsOfLines;
    }
}

