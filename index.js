const Gameboard = (function () {
  const board = ["", "", "", "", "", "", "", "", ""];

  const readBoard = () => board;

  const placeMark = function (index, mark) {
    if (board[index] !== "") {
      return false;
    } else {
      board[index] = mark;
      return true;
    }
  };

  const resetBoard = function () {
    for (let i = 0; i < board.length; i++) {
      board[i] = "";
    }
  };
  return { readBoard, placeMark, resetBoard };
})();

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

  const getActivePlayer = function () {
    return activePlayer;
  };

  const switchPlayer = function () {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  };

  const checkWin = function () {
    const board = Gameboard.readBoard();
    return winCombinations.some((combination) =>
      combination.every((index) => board[index] === activePlayer.mark),
    );
  };

  const checkTie = function () {
    return Gameboard.readBoard().every((cell) => cell !== "");
  };

  const playRound = function (index) {
    if (gameOver) return;

    if (!Gameboard.placeMark(index, activePlayer.mark)) return;

    if (checkWin() || checkTie()) {
      gameOver = true;
      return;
    }

    switchPlayer();
  };

  const restartGame = function () {
    activePlayer = players[0];
    Gameboard.resetBoard();
    gameOver = false;
  };

  return { playRound, getActivePlayer, restartGame };
})();

const DisplayController = ()();
