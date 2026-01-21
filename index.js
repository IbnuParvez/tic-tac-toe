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

const Gamecontroller = (function () {
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

  const playRound = function () {};

  const getActivePlayer = function () {};

  const restartGame = function () {};

  return { playRound, getActivePlayer, restartGame };
})();
