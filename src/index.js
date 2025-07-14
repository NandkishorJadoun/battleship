import { screenController } from "./UI/screencontroller.js";
import { Player } from "./Player/player.js";
import { shipRandomiser } from "./shipRandomiser.js";
import "./Styles/styles.css";

const nameDialog = document.querySelector(".name-dialog");
const submitNameBtn = document.querySelector("#submit-name");
const nameInput = document.querySelector("#name");

nameInput.value = localStorage.getItem("userName");

document.addEventListener("DOMContentLoaded", () => {
  nameDialog.showModal();
});

submitNameBtn.addEventListener("click", () => {
  nameDialog.close();

  localStorage.setItem("userName", nameInput.value);
  const name = nameInput.value;

  const real = !name ? new Player("Human") : new Player(name);
  const computer = new Player("Computer");

  shipRandomiser(real, computer);
  screenController(real, computer);
});

const playAgainBtn = document.querySelector(".play-again");

playAgainBtn.addEventListener("click", () => {
  window.location.reload();
});
