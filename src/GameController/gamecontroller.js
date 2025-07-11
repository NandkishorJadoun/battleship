export function GameController(playerOne, playerTwo) {
  const players = [playerOne, playerTwo];

  let activePlayer = players[0];
  let passivePlayer = players[1];

  const switchActivePlayer = () =>
    (activePlayer = activePlayer === players[0] ? players[1] : players[0]);

  const switchPassivePlayer = () =>
    (passivePlayer = passivePlayer === players[1] ? players[0] : players[1]);

  const getActivePlayer = () => activePlayer;
  const getPassivePlayer = () => passivePlayer;

  const getPlayerOneBoard = () => playerOne.gameboard.board;
  const getPlayerTwoBoard = () => playerTwo.gameboard.board;

  const getWinner = () => {
    if (playerOne.gameboard.allShipSunk()) {
      return playerTwo;
    } else if (playerTwo.gameboard.allShipSunk()) {
      return playerOne;
    }
    return null;
  };

  const playRound = (x, y, passivePlayer = getPassivePlayer()) => {
    const attack = passivePlayer.gameboard.receiveAttack(x, y);

    if (!getWinner()) {
      switchActivePlayer();
      switchPassivePlayer();
      return attack;
    }

    return;
  };

  return {
    getActivePlayer,
    getPassivePlayer,
    getPlayerOneBoard,
    getPlayerTwoBoard,
    playRound,
    getWinner,
  };
}
