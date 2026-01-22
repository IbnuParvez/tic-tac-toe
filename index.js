/* --- Player Factory --- */
const Player = (name, mark) => ({ name, mark });

/* --- Gameboard Module --- */
const Gameboard = (function () {
  const board = ["", "", "", "", "", "", "", "", ""];
  const readBoard = () => board;
  const placeMark = (index, mark) => {
    if (board[index] !== "") return false;
    board[index] = mark;
    return true;
  };
  const resetBoard = () => {
    for (let i = 0; i < board.length; i++) board[i] = "";
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
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const getActivePlayer = () => activePlayer;
  const isGameOver = () => gameOver;

  const switchPlayer = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  };

  const checkWin = () => {
    const board = Gameboard.readBoard();
    return winCombinations.some((combo) =>
      combo.every((i) => board[i] === activePlayer.mark),
    );
  };

  const checkTie = () => Gameboard.readBoard().every((cell) => cell !== "");

  const playRound = (index) => {
    if (gameOver) return;

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

  const restartGame = () => {
    activePlayer = players[0];
    Gameboard.resetBoard();
    gameOver = false;
  };

  return { playRound, getActivePlayer, restartGame, isGameOver };
})();

/* --- Display Controller Module --- */
const DisplayController = (function () {
  const boardDiv = document.getElementById("gameboard");
  const statusText = document.getElementById("status-text");
  const restartBtn = document.getElementById("restart-btn");
  const cells = document.querySelectorAll(".cell");

  const render = (result) => {
    const board = Gameboard.readBoard();
    cells.forEach((cell, index) => {
      cell.textContent = board[index];
    });
    updateStatus(result);
  };

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

  cells.forEach((cell) => {
    cell.addEventListener("click", () => {
      if (GameController.isGameOver()) return;
      const index = cell.dataset.index;
      const result = GameController.playRound(index);
      render(result);
    });
  });

  restartBtn.addEventListener("click", () => {
    GameController.restartGame();
    render();
  });

  render();
})();
