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
        board[i][j] = { ship: null, attacked: false };
      }
    }

    return board;
  }

  placeShip(ship, xCoord, yCoord, direction, board = this.board) {

    let x = xCoord
    let y = yCoord
    const success = false;
    const coordinates = [];

    const result = { success, coordinates };

    if (xCoord < 0 || xCoord > 9 || yCoord < 0 || yCoord > 9) {
      return result;
    }

    const shipLength = ship.length;

    if (direction === "horizontal") {
      for (let i = 0; i < shipLength; i++) {
        if (yCoord >= 0 && yCoord <= 9 && board[xCoord][yCoord].ship === null) {
          result.success = true;
          result.coordinates.push([xCoord, yCoord]);
          yCoord++;
        } else {
          result.success = false;
          result.coordinates = [];
          return result;
        }
      }
    } else if (direction === "vertical") {
      for (let i = 0; i < shipLength; i++) {
        if (xCoord >= 0 && xCoord <= 9 && board[xCoord][yCoord].ship === null) {
          result.success = true;
          result.coordinates.push([xCoord, yCoord]);
          xCoord++;
        } else {
          result.success = false;
          result.coordinates = [];
          return result;
        }
      }
    } 

    // track all the ships on gameboard

    if (result.success) {
      for (let i = 0; i < shipLength; i++) {
        board[x][y].ship = ship;
        direction === "horizontal" ? y++ : x++
      }
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
    board[xCoord][yCoord].attacked = true;

    let result;
    let ship;
    const coordinates = [xCoord, yCoord];

    const attackResult = { result, ship, coordinates };

    if (attackedCoord.has([xCoord, yCoord].toString())) {
      attackResult.ship = board[xCoord][yCoord].ship;
      attackResult.result = "already attacked";
      return attackResult;
    }

    if (board[xCoord][yCoord].ship) {
      attackResult.ship = board[xCoord][yCoord].ship;
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
