import { GameBoard } from "../Gameboard/gameboard.js";

export class Player {
  constructor(name) {
    this.name = name;
    this.gameboard = new GameBoard();
  }
}
