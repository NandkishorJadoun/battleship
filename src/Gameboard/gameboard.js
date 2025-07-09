export class GameBoard {
  constructor() {
    this.board = this.#generateBoard();
  }

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

    return result;
  }
}
