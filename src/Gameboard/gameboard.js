export class GameBoard {
  constructor() {
    this.board = this.#generateBoard();
    this.ships = [];
    this.missedAttacks = [];
  }

  #attackedCoord = new Set();

  #generateBoard() {
    const row = 10;
    const column = 10;

    const board = [];

    for (let i = 0; i < row; i++) {
      board[i] = [];
      for (let j = 0; j < column; j++) {
        board[i][j] = 0;
      }
    }

    return board;
  }

  placeShip(ship, xCoord, yCoord, direction, board = this.board) {
    const success = false;
    const coordinates = [];

    const result = { success, coordinates };

    if (xCoord < 0 || xCoord > 9 || yCoord < 0 || yCoord > 9) {
      return result;
    }

    const shipLength = ship.length;

    for (let i = 0; i < shipLength; i++) {
      if (board[xCoord][yCoord] === 0) {
        board[xCoord][yCoord] = ship;
        result.coordinates.push([xCoord, yCoord]);
        result.success = true;
        direction === "horizontal" ? yCoord++ : xCoord++;
      } else {
        result.success = false;
        result.coordinates = [];
        return result;
      }
    }

    // track all the ships on gameboard

    if (result.success) {
      this.ships.push(ship);
    }

    return result;
  }

  receiveAttack(
    xCoord,
    yCoord,
    board = this.board,
    attackedCoord = this.#attackedCoord,
  ) {
    let result;
    let ship;
    const coordinates = [xCoord, yCoord];

    const attackResult = { result, ship, coordinates };

    if (attackedCoord.has([xCoord, yCoord].toString())) {
      attackResult.ship = board[xCoord][yCoord];
      attackResult.result = "already attacked";
      return attackResult;
    }

    if (board[xCoord][yCoord] !== 0) {
      attackResult.ship = board[xCoord][yCoord];
      attackResult.ship.hit();

      attackResult.result = attackResult.ship.isSunk() ? "sunk" : "hit";

      attackedCoord.add(attackResult.coordinates.toString());

      return attackResult;
    }

    attackResult.ship = null;
    attackResult.result = "miss";
    attackedCoord.add(attackResult.coordinates.toString());

    this.missedAttacks.push(attackResult.coordinates);

    return attackResult;
  }

  allShipSunk(ships = this.ships) {
    const checkEachShip = (ship) => ship.isSunk();
    return ships.every(checkEachShip);
  }
}
