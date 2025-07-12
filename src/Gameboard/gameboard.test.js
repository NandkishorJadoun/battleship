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
    new GameBoard().board.every((row) => row.every((val) => val.attacked === false)),
  ).toBe(true);
});

describe("placeShip method: ", () => {
  const gameboard = new GameBoard();
  const carrier = new Carrier();
  const battleship = new Battleship();
  const cruiser = new Cruiser();
  const destroyer = new Destroyer();

  const placingCarrier = gameboard.placeShip(carrier, 0, 0, "horizontal");

  const placingBattleship = gameboard.placeShip(battleship, 0, 4, "vertical");

  const placingCruiser = gameboard.placeShip(cruiser, 1, 0, "vertical");

  const placingDestroyer = gameboard.placeShip(destroyer, -1, 10, "horizontal");

  test("should be able to place ships", () => {
    expect(placingCarrier.success).toBe(true);
  });

  test("return false if other ship is already placed", () => {
    expect(placingBattleship.success).toBe(false);
  });

  test("should return coordinates if ship is placed", () => {
    expect(placingCruiser.coordinates).toEqual([
      [1, 0],
      [2, 0],
      [3, 0],
    ]);
  });

  test("should return false when coordinates are invalid", () => {
    expect(placingDestroyer.success).toBe(false);
  });
});

describe("receiveAttack method: ", () => {
  const gameboard = new GameBoard();
  const carrier = new Carrier();
  const destroyer = new Destroyer();

  gameboard.placeShip(carrier, 0, 0, "horizontal");
  gameboard.placeShip(destroyer, 2, 0, "veritcal");

  const attack1 = gameboard.receiveAttack(0, 0);
  const attack2 = gameboard.receiveAttack(2, 0);
  const attack3 = gameboard.receiveAttack(2, 1);
  const attack4 = gameboard.receiveAttack(2, 0);

  test("returns the coordinates of the attack", () => {
    expect(attack1.coordinates).toEqual([0, 0]);
    expect(attack2.coordinates).toEqual([2, 0]);
    expect(attack3.coordinates).toEqual([2, 1]);
  });

  test("returns the result of the attack", () => {
    expect(attack1.result).toBe("hit");
    expect(attack2.result).toBe("sunk");
    expect(attack3.result).toBe("miss");
    expect(attack4.result).toBe("already attacked");
  });

  test("return ship name when attack hits a ship", () => {


    expect(attack1.ship).toEqual(carrier);
    expect(attack2.ship).toEqual(destroyer);

    console.log(attack4)
    expect(attack3.ship).toEqual(null);
    expect(attack4.ship).toEqual(destroyer);
  });
});

describe("should keep track of missed attacks: ", () => {
  const gameboard1 = new GameBoard();
  const destroyer = new Destroyer();
  gameboard1.placeShip(destroyer, 0, 0, "veritcal");
  gameboard1.receiveAttack(0, 0);

  const gameboard2 = new GameBoard();
  gameboard2.receiveAttack(0, 0);
  gameboard2.receiveAttack(0, 1);

  test("return empty array when all attacks hit ship", () => {
    expect(gameboard1.missedAttacks).toEqual([]);
  });

  test("return coordinates of missed attacks", () => {
    expect(gameboard2.missedAttacks).toEqual([
      [0, 0],
      [0, 1],
    ]);
  });
});

describe("should report if all ships are sunk: ", () => {
  const gameboard1 = new GameBoard();
  const destroyer = new Destroyer();
  gameboard1.placeShip(destroyer, 0, 0, "veritcal");
  gameboard1.receiveAttack(0, 0);

  const gameboard2 = new GameBoard();
  const cruiser = new Cruiser();
  gameboard2.placeShip(cruiser, 0, 0, "veritcal");
  gameboard2.receiveAttack(0, 0);

  test("return true when all ships are sunk", () => {
    expect(gameboard1.allShipSunk()).toBe(true);
  });

  test("return false when all ships are not sunk", () => {
    expect(gameboard2.allShipSunk()).toBe(false);
  });
});
