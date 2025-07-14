import {
  Carrier,
  Battleship,
  Cruiser,
  Submarine,
  Destroyer,
} from "./Ships/ship.js";

const compCarrier = new Carrier();
const compBattleship = new Battleship();
const compFirstCruiser = new Cruiser();
const compSecondCruiser = new Cruiser();
const compFirstSubmarine = new Submarine();
const compSecondSubmarine = new Submarine();
const compFirstDestroyer = new Destroyer();
const compSecondDestroyer = new Destroyer();

const realCarrier = new Carrier();
const realBattleship = new Battleship();
const realFirstCruiser = new Cruiser();
const realSecondCruiser = new Cruiser();
const realFirstSubmarine = new Submarine();
const realSecondSubmarine = new Submarine();
const realFirstDestroyer = new Destroyer();
const realSecondDestroyer = new Destroyer();

const DIRECTION = ["horizontal", "vertical"];

export const shipRandomiser = (playerOne, playerTwo) => {
  const compShips = [
    compCarrier,
    compBattleship,
    compFirstCruiser,
    compSecondCruiser,
    compFirstSubmarine,
    compSecondSubmarine,
    compFirstDestroyer,
    compSecondDestroyer,
  ];

  const realShips = [
    realCarrier,
    realBattleship,
    realFirstCruiser,
    realSecondCruiser,
    realFirstSubmarine,
    realSecondSubmarine,
    realFirstDestroyer,
    realSecondDestroyer,
  ];

  for (const comShip of compShips) {
    let placed = { success: false };

    while (!placed.success) {
      const x = Math.floor(Math.random() * 10);
      const y = Math.floor(Math.random() * 10);
      const dir = Math.floor(Math.random() * 2);

      placed = playerTwo.gameboard.placeShip(comShip, x, y, DIRECTION[dir]);
    }
  }

  for (const realShip of realShips) {
    let placed = { success: false };

    while (!placed.success) {
      const x = Math.floor(Math.random() * 10);
      const y = Math.floor(Math.random() * 10);
      const dir = Math.floor(Math.random() * 2);

      placed = playerOne.gameboard.placeShip(realShip, x, y, DIRECTION[dir]);
    }
  }
};
