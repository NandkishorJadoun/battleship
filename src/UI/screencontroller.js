import { GameController } from "../GameController/gamecontroller.js";

export function screenController(playerOne, playerTwo) {
  const game = GameController(playerOne, playerTwo);
  const playerOneGameboard = document.querySelector(".real");
  const playerTwoGameboard = document.querySelector(".computer");
  const outcome = document.querySelector(".outcome");
  const winner = document.querySelector(".winner");
  const resultModal = document.querySelector(".result-modal");

  const activePlayerName = document.querySelector(".active-player-name")
  const playerOneBoardName = document.querySelector(".real-board-name")

  playerOneBoardName.textContent = playerOne.name

  let playRoundResult;
  
  function clickHandlerBoard(e) {
    const row = parseInt(e.target.dataset.row);
    const col = parseInt(e.target.dataset.column);
    if (isNaN(row) || isNaN(col)) return;

    playRoundResult = game.playRound(row, col);
    render();
  }

  function render() {

    activePlayerName.textContent = game.getActivePlayer().name

    playerOneGameboard.textContent = "";
    playerTwoGameboard.textContent = "";

    if (playRoundResult) {
      const resultText = {
        hit: "Hit!",
        miss: "Miss!",
        sunk: "Sunk!",
        "already attacked": "Already attacked!",
      };
      outcome.textContent = resultText[playRoundResult.result] || "";
    }

    renderBoard(game.getPlayerOneBoard(), playerOneGameboard);
    renderBoard(game.getPlayerTwoBoard(), playerTwoGameboard);

    if (game.getWinner()) {
      winner.textContent = `${game.getWinner().name} won!`;
      resultModal.showModal();
      playerOneGameboard.removeEventListener("click", clickHandlerBoard);
      playerTwoGameboard.removeEventListener("click", clickHandlerBoard);
      return;
    }

    const currentPlayer = game.getActivePlayer();

    if (currentPlayer.name === "Computer") {
      setTimeout(() => {
        
        const x = Math.floor(Math.random() * 10);
        const y = Math.floor(Math.random() * 10);
        playRoundResult = game.playRound(x, y);
        render();
      }, 500);
    } else {

      playerTwoGameboard.removeEventListener("click", clickHandlerBoard);
      playerTwoGameboard.addEventListener("click", clickHandlerBoard);
    }
  }

  function renderBoard(boardArray, container) {
    boardArray.forEach((row, rowIdx) => {
      row.forEach((cell, colIdx) => {
        const btn = document.createElement("button");
        btn.classList.add("cell");
        btn.dataset.row = rowIdx;
        btn.dataset.column = colIdx;

        if (container.classList[0] !== "computer" && cell.ship) {
          btn.classList.add("ship");
        }

        if (cell.ship && cell.attacked) btn.classList.add("hit");
        else if (!cell.ship && cell.attacked) btn.classList.add("miss");
        container.appendChild(btn);
      });
    });
  }

  render();
}
