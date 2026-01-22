/* --- Player Factory --- */
const Player = (name, mark) => {
  return { name, mark };
};

/* --- Gameboard Module --- */
const Gameboard = (function () {
  const board = ["", "", "", "", "", "", "", "", ""];

  const readBoard = () => board;

  const placeMark = function (index, mark) {
    if (board[index] !== "") return false;
    board[index] = mark;
    return true;
  };

  const resetBoard = function () {
    for (let i = 0; i < board.length; i++) {
      board[i] = "";
    }
  };

  return { readBoard, placeMark, resetBoard };
})();

/* --- Game Controller Module --- */
const GameController = (function () {
  const players = [Player("Player 1", "X"), Player("Player 2", "O")];
  let activePlayer = players[0];
  let gameOver = false;

  const winCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // Rows
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // Cols
    [0, 4, 8],
    [2, 4, 6], // Diagonals
  ];

  const getActivePlayer = () => activePlayer;
  const isGameOver = () => gameOver;

  const switchPlayer = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  };

  const checkWin = () => {
    const board = Gameboard.readBoard();
    return winCombinations.some((combination) =>
      combination.every((index) => board[index] === activePlayer.mark),
    );
  };

  const checkTie = () => Gameboard.readBoard().every((cell) => cell !== "");

  const playRound = function (index) {
    if (gameOver) return;

    // If the mark was placed successfully, check for game end
    if (Gameboard.placeMark(index, activePlayer.mark)) {
      if (checkWin()) {
        gameOver = true;
        return "win";
      }
      if (checkTie()) {
        gameOver = true;
        return "tie";
      }
      switchPlayer();
      return "continue";
    }
  };

  const restartGame = function () {
    activePlayer = players[0];
    Gameboard.resetBoard();
    gameOver = false;
  };

  return { playRound, getActivePlayer, restartGame, isGameOver };
})();

/* --- Display Controller Module --- */
const DisplayController = (function () {
  // 1. Cache DOM Elements
  const boardDiv = document.getElementById("gameboard");
  const statusText = document.getElementById("status-text");
  const restartBtn = document.getElementById("restart-btn");

  // 2. The Render Function: Syncs UI with the Gameboard array
  const render = (result) => {
    const board = Gameboard.readBoard();
    boardDiv.innerHTML = ""; // Clear board before redraw

    board.forEach((mark, index) => {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.dataset.index = index;
      cell.textContent = mark;
      boardDiv.appendChild(cell);
    });

    updateStatus(result);
  };

  // 3. Update the Status Text based on the game state
  const updateStatus = (result) => {
    const currentPlayer = GameController.getActivePlayer();

    if (result === "win") {
      statusText.textContent = `${currentPlayer.name} Wins!`;
    } else if (result === "tie") {
      statusText.textContent = "It's a Draw!";
    } else {
      statusText.textContent = `${currentPlayer.name}'s turn (${currentPlayer.mark})`;
    }
  };

  // 4. Bind Events
  boardDiv.addEventListener("click", (e) => {
    // Only proceed if a cell was clicked and the game isn't over
    const index = e.target.dataset.index;
    if (index === undefined || GameController.isGameOver()) return;

    // Pass index to logic, get result back, and redraw
    const result = GameController.playRound(index);
    render(result);
  });

  restartBtn.addEventListener("click", () => {
    GameController.restartGame();
    render();
  });

  // Initial call to show the board on page load
  render();

  return { render };
})();
