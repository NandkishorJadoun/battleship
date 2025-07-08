import {
  Ship,
  Carrier,
  Battleship,
  Cruiser,
  Submarine,
  Destroyer,
} from "../Ships/ship.js";

const newShip = new Ship();
newShip.hit();
newShip.hit();

test("should return current hit counts", () => {
  expect(newShip.hitCount).toBe(2);
  expect(newShip.hit()).toBe(3);
});

test("should return length of the itself", () => {
  expect(new Carrier().length).toBe(5);
  expect(new Battleship().length).toBe(4);
  expect(new Cruiser().length).toBe(3);
  expect(new Submarine().length).toBe(2);
  expect(new Destroyer().length).toBe(1);
});

const newSubmarine = new Submarine();
newSubmarine.hit();
newSubmarine.hit();
newSubmarine.hit();

test("should check if a ship is sunk or not", () => {
  expect(newSubmarine.isSunk()).toBe(true);
});
