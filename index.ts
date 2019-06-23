import Game from "./game";

(function main(): void {
    const startButton = document.getElementById("startGameButton");
    const game = new Game("game");
    startButton.addEventListener("click", (event: Event) => {
        const boardWidthInput = document.getElementById("boardWidth") as HTMLInputElement;
        const boardHeightInput = document.getElementById("boardHeight") as HTMLInputElement;

        const boardWidth = parseInt(boardWidthInput.value);
        const boardHeight = parseInt(boardHeightInput.value);
        console.log(boardWidth,boardHeight);
        game.startGame(boardWidth,boardHeight);
    });
})();
