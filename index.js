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
