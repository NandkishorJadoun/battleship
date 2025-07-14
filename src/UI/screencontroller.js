import { GameController } from "../GameController/gamecontroller.js";

export function screenController(playerOne, playerTwo) {
  const game = GameController(playerOne, playerTwo);
  const activePlayerPara = document.querySelector(".active-player");
  const playerOneGameboard = document.querySelector(".real");
  const playerTwoGameboard = document.querySelector(".computer");
  const winner = document.querySelector(".winner");
  const outcome = document.querySelector(".outcome");
  const resultModal = document.querySelector(".result-modal");

  const realPlayerBoardName = document.querySelector(".real-board-name");

  const playerOneGameboardArr = game.getPlayerOneBoard();
  const playerTwoGameboardArr = game.getPlayerTwoBoard();

  realPlayerBoardName.textContent = playerOne.name;

  let playRoundResult;

  function clickHandlerBoard(e) {
    const selectedColumn = e.target.dataset.column;
    const selectedRow = e.target.dataset.row;

    if (!selectedColumn && !selectedRow) return;

    playRoundResult = game.playRound(selectedRow, selectedColumn);
    updateScreen();
  }

  const updateScreen = () => {
    playerOneGameboard.textContent = "";
    playerTwoGameboard.textContent = "";

    const activePlayer = game.getActivePlayer();
    activePlayerPara.textContent = `${activePlayer.name}'s turn`;

    if (playRoundResult) {
      switch (playRoundResult.result) {
        case "hit":
          outcome.textContent = `${game.getPassivePlayer().name} hit the ship`;
          break;

        case "miss":
          outcome.textContent = `${game.getPassivePlayer().name} missed`;
          break;

        case "sunk":
          outcome.textContent = `${game.getActivePlayer().name}'s ship has been sunk`;
          break;

        case "already attacked":
          outcome.textContent = `Already an Attacked Cell`;
      }
    }

    renderPlayerBoard(playerOneGameboardArr, playerOneGameboard);
    renderPlayerBoard(playerTwoGameboardArr, playerTwoGameboard);

    if (game.getWinner()) {
      const winnerName = game.getWinner().name;
      winner.textContent = `${winnerName} won the game`;

      playerOneGameboard.removeEventListener("click", clickHandlerBoard);
      playerTwoGameboard.removeEventListener("click", clickHandlerBoard);

      resultModal.showModal();
    } else {
      if (game.getActivePlayer() === playerOne) {
        playerOneGameboard.removeEventListener("click", clickHandlerBoard);
        playerTwoGameboard.addEventListener("click", clickHandlerBoard);
      } else if (game.getActivePlayer() === playerTwo) {
        playerTwoGameboard.removeEventListener("click", clickHandlerBoard);
        playerOneGameboard.addEventListener("click", clickHandlerBoard);
      }
    }
  };

  updateScreen();
}

const renderPlayerBoard = (playerGameBoardArr, playerGameBoard) => {
  playerGameBoardArr.forEach((row, rowIdx) => {
    row.forEach((cell, columnIdx) => {
      const cellBtn = document.createElement("button");
      cellBtn.classList.add("cell");

      cellBtn.dataset.row = rowIdx;
      cellBtn.dataset.column = columnIdx;

      if (cell.ship) {
        cellBtn.classList.add("ship");
      }

      if (cell.ship && cell.attacked) {
        cellBtn.classList.add("hit");
      }

      if (!cell.ship && cell.attacked) {
        cellBtn.classList.add("miss");
      }
      playerGameBoard.appendChild(cellBtn);
    });
  });
};
