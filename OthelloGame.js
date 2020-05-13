var board = document.getElementById("board");
var gameBoard = [[], [], [], [], [], [], [], []]
// ADDING THE GAMEBOARD

function main() {
  createBoard()
}

function placePiece(row, col, color) {
  var piece = document.createElement('div');
  piece.classList.add("circle");
  piece.style.backgroundColor = color;
  gameBoard[row][col].space.appendChild(piece);
  gameBoard[row][col].color = color;
}

main()