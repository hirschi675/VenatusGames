var board = document.getElementById("board");
var gameBoard = [[], [], [], [], [], [], [], []]
var whitePieces = [];
var blackPieces = [];
var legalMoves = [];
var turn = "black";

function main() {
  createBoard()
  findMoves()
}

// ADDING THE GAMEBOARD
function createBoard() {
  var row = 0;
  var col = 0;

  for (var i=0; i < 64; i++) {
    let space = document.createElement("div");
    space.classList.add("space");
    space.addEventListener("click", function(e) {
      for (move of legalMoves) {
        if(move.space == e.target) {
          changePieces(move)
        }
      }
    });
    board.appendChild(space);
    gameBoard[row][col] = {
      color: "none", 
      space: space
    };
    row += 1;
    if (row == 8) {
      row = 0;
      col += 1;
    }
  }
  placePiece(3, 3, "black")
  placePiece(3, 4, "white")
  placePiece(4, 3, "white")
  placePiece(4, 4, "black")
}


// FUNCTION TO CHANGE THE PIECES
function changePieces(move) {
  placePiece(move.row, move.col, turn)
  newRow = move.row + move.dx
  newCol = move.col + move.dy
  while(gameBoard[newRow][newCol].color != turn) {
    gameBoard[newRow][newCol].color = turn
    gameBoard[newRow][newCol].piece.style.backgroundColor = turn
  }

  deleteLegalMoves()
  changeTurn()
  findMoves()
}

function changeTurn() {
  if(turn == "white"){
    turn = "black"
  }
  else {
    turn = "white"
  }
}

function deleteLegalMoves() {
  legalMoves = [];
  for (row=0; row<8; row++) {
    for (col=0; col<8; col++) {
      gameBoard[row][col].space.style.backgroundColor = "#3B5323"
    }
  }
}

//FUNCTION FOR CHECKING THE MOVES OF THE CURRENT PLAYER
function findMoves() {
  if(turn == "white") {
   for (piece of whitePieces) {
    wRow = piece.row;
    wCol = piece.col;
    //white x directions
    checkDirection(wRow, wCol, -1, 0);
    checkDirection(wRow, wCol, 1, 0);
    //white y directions
    checkDirection(wRow, wCol, 0, 1);
    checkDirection(wRow, wCol, 0, -1);
    //white diagonal directions
    checkDirection(wRow, wCol, -1, -1);
    checkDirection(wRow, wCol, 1, 1);
    checkDirection(wRow, wCol, -1, 1);
    checkDirection(wRow, wCol, 1, -1);
   }
  }
  else {
    for (piece of blackPieces) {
      bRow = piece.row;
      bCol = piece.col;
      //black x directions
      checkDirection(bRow, bCol, -1, 0);
      checkDirection(bRow, bCol, 1, 0);
      //black y directions
      checkDirection(bRow, bCol, 0, 1);
      checkDirection(bRow, bCol, 0, -1);
      //black diagonal directions
      checkDirection(bRow, bCol, -1, -1);
      checkDirection(bRow, bCol, 1, 1);
      checkDirection(bRow, bCol, -1, 1);
      checkDirection(bRow, bCol, 1, -1);
    }
  }
}

//FUNCTION FOR PLACING PIECE ON GAMEBOARD
function placePiece(row, col, color) {
  var piece = document.createElement('div');
  piece.classList.add("circle");
  piece.style.backgroundColor = color;
  gameBoard[row][col].space.appendChild(piece);
  gameBoard[row][col].color = color;
  gameBoard[row][col].piece = piece;
  if (color == "white") {
    whitePieces.push({
      row: row,
      col: col
    })
  } else {
    blackPieces.push({
      row: row,
      col: col
    })
  }
}

//FUNCTION FOR CHECKING EACH DIRECTION AROUND PIECE FOR POSSIBLE MOVES
function checkDirection(row, col, dx, dy) {
  var newRow = row;
  var newCol = col;
  if (gameBoard[row+dx][col+dy].color != turn && gameBoard[row+dx][col+dy].color != 'none') {
    newRow += dx;
    newCol += dy
    while (newRow <= 8 && newRow >= 0 && newCol <= 8 && newCol >= 0 && gameBoard[newRow][newCol].color != turn) {
      if (gameBoard[newRow][newCol].color == "none") {
        gameBoard[newRow][newCol]
        .space.style.backgroundColor = "blue"
        legalMoves.push({
          row: newRow,
          col: newCol,
          dx: -dx,
          dy: -dy,
          space: gameBoard[newRow][newCol].space
        })
        return
      }
      newRow += dx;
      newCol += dy
    }
  }
}

main()