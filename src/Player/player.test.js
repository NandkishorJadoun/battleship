import { Player } from "../Player/player.js";

import { GameBoard } from "../Gameboard/gameboard.js";

test("players should contain its own gameboard", () => {
  expect(new Player().gameboard instanceof GameBoard).toBe(true);
});
