import { GameBoard } from "../Gameboard/gameboard.js";
import {
  Carrier,
  Battleship,
  Cruiser,
  Submarine,
  Destroyer,
} from "../Ships/ship.js";

test("should initialize a 10 x 10 grid", () => {
  expect(new GameBoard().board.length).toBe(10);
  expect(new GameBoard().board.every((row) => row.length === 10)).toBe(true);
  expect(
    new GameBoard().board.every((row) => row.every((val) => val === 0)),
  ).toBe(true);
});

const gameboard = new GameBoard();
const carrier = new Carrier();
const battleship = new Battleship();
const cruiser = new Cruiser();
const destroyer = new Destroyer();

test("should be able to place ships", () => {
  expect(gameboard.placeShip(carrier, 0, 0, "horizontal")).toEqual({
    success: true,
    coordinates: [
      [0, 0],
      [0, 1],
      [0, 2],
      [0, 3],
      [0, 4],
    ],
  });

  expect(gameboard.placeShip(battleship, 0, 4, "vertical")).toEqual({
    success: false,
    coordinates: [],
  });

  expect(gameboard.placeShip(cruiser, 1, 0, "vertical")).toEqual({
    success: true,
    coordinates: [
      [1, 0],
      [2, 0],
      [3, 0],
    ],
  });

  expect(gameboard.placeShip(destroyer, -1, 10, "horizontal")).toEqual({
    success: false,
    coordinates: [],
  });
});
