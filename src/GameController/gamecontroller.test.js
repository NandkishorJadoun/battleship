import { GameController } from "./gamecontroller.js";
import { Player } from "../Player/player.js";
import {
  Carrier,
  Battleship,
  Cruiser,
  Submarine,
  Destroyer,
} from "../Ships/ship.js";

describe("GameController", () => {
  const real = new Player("real");
  const comp = new Player("computer");

  const realDestroyer = new Destroyer();
  const compDestroyer = new Destroyer();

  real.gameboard.placeShip(realDestroyer, 0, 1, "vertical");
  comp.gameboard.placeShip(compDestroyer, 1, 1, "vertical");

  const game = GameController(real, comp);

  it("should return correct active/passive player", () => {
    expect(game.getActivePlayer()).toEqual(real);
    expect(game.getPassivePlayer()).toEqual(comp);
  });

  it("should return both players board", () => {
    expect(game.getPlayerOneBoard()).toEqual(real.gameboard.board);
    expect(game.getPlayerTwoBoard()).toEqual(comp.gameboard.board);
  });

  it("should be able to switch active/passive players", () => {
    game.playRound(0, 2);
    expect(game.getActivePlayer()).toEqual(comp);
    expect(game.getPassivePlayer()).toEqual(real);
  });

  it("should return the winner", () => {
    const compAttack = game.playRound(0, 1);
    expect(game.getWinner()).toEqual(comp);
  });
});
