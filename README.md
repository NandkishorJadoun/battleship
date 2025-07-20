
# Battleship Game

A classic two player Battleship game implemented using modern JavaScript practices. Built as the final project of the **JavaScript section** from [The Odin Project](https://www.theodinproject.com/).

> This project uses Webpack, ES6 modules, Jest for testing, and applies TDD principles throughout development.

## Live Demo

🔗 [Play Battleship](https://nandkishorjadoun.github.io/battleship/)

## Tech Stack

* **JavaScript (ES6+)**
* **HTML & CSS**
* **Webpack**
* **Jest** for unit testing
* **Prettier + ESLint**
* **Babel** for transpiling
* **Conventional Commits** for version control

## 🎮 Features

* Turn-based gameplay between human and computer
* Ships placed randomly for both players
* Clear UI feedback on:

  * Hits
  * Misses
  * Sunk ships
* Winner detection & endgame dialog
* Responsive design (mobile-friendly)

## Testing

This project follows **Test-Driven Development (TDD)**.

```bash
# Run all tests
npm run test
```

Tests written with Jest cover core logic like:

* Ship placement
* Attack handling
* Win condition
* Gameboard updates

## 📦 Installation

```bash
git clone https://github.com/NandkishorJadoun/battleship.git
cd battleship
npm install
npm run dev
```

## 💡 Lessons Learned

* Structuring logic with classes and factories
* Using TDD to drive implementation
* Managing DOM interactions alongside logic
* Applying ESLint + Prettier for clean code
* Practicing separation of concerns (UI vs Game logic)
