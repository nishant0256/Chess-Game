# Chess-Game

A browser-based Chess game built with **HTML, CSS, and JavaScript**. The project lets you play chess against the computer with selectable difficulty and color, using a visual board and audio feedback for moves and captures.

## 🧠 Features

- 🎮 Play **against a computer opponent**
- 🏁 Choose your **color** (White or Black)
- 📊 Select **difficulty level**
- 🎵 Sound effects for **moves, captures, checkmate, and victory**
- 🖼️ Interactive **drag-and-drop** chessboard UI
- 📦 Uses Chessboard.js and Chess.js for movement & rules logic
- 🗃️ Stores selections using **localStorage**

## 📁 Repository Structure
📦Chess-Game
┣ 📜index.html ← Main menu / mode selection
┣ 📜game.html ← Chessboard gameplay view
┣ 📜play-computer.html ← Game vs computer view
┣ 📜script.js ← Game logic + AI + UI behaviors
┣ 📜style.css ← Styling for pages and board
┗ 📂sounds ← Move/capture/checkmate sounds


## 🧩 How It Works

- **index.html:** Landing page where users choose between playing vs computer or 2-player mode (UI only).
- **play-computer.html:** Page that loads a Chessboard.js board and connects interactive gameplay with the Chess.js logic engine.
- **script.js:** Handles:
  - Player moves and promotion
  - Random AI moves for the computer
  - Sound & visual updates
  - Determining checkmate and game over
- **style.css:** Board and UI styling
- **sounds:** Audio feedback for game events

## 🕹️ Gameplay Instructions

1. Open the project in your browser (or host it locally).
2. Choose **Play vs Computer** from the menu.
3. Select your **color** (White/Black).
4. Adjust **difficulty** with the slider.
5. Click **Start Game** to begin.
6. Pieces can be moved by **drag-and-drop**.
7. If you get checkmated, a modal shows who won.
8. Click **Play Again** to restart.

## 🚀 Running Locally

To play locally:

1. Clone the repository:

```bash
git clone https://github.com/nishant0256/Chess-Game.git
