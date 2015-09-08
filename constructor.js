// Game constructor function
function Game() {
  this.turn = "white";
}
Game.prototype.initializeNewGame = function() {
  // Initialize all instances of Piece
  pieces.bp0 = new Pawn("g", 0, "black", "bp0");
  pieces.bp1 = new Pawn("g", 1, "black", "bp1");
  pieces.bp2 = new Pawn("g", 2, "black", "bp2");
  pieces.bp3 = new Pawn("g", 3, "black", "bp3");
  pieces.bp4 = new Pawn("g", 4, "black", "bp4");
  pieces.bp5 = new Pawn("g", 5, "black", "bp5");
  pieces.bp6 = new Pawn("g", 6, "black", "bp6");
  pieces.bp7 = new Pawn("g", 7, "black", "bp7");
  pieces.br1 = new Rook("h", 0, "black", "br1");
  pieces.br2 = new Rook("h", 7, "black", "br2");
  pieces.bk1 = new Knight("h", 1, "black", "bk1");
  pieces.bk2 = new Knight("h", 6, "black", "bk2");
  pieces.bb1 = new Bishop("h", 2, "black", "bb1");
  pieces.bb1 = new Bishop("h", 5, "black", "bb1");
  pieces.bq = new Queen("h", 3, "black", "bq");
  pieces.bk = new King("h", 4, "black", "bk");

  pieces.wp0 = new Pawn("b", 0, "white", "wp0");
  pieces.wp1 = new Pawn("b", 1, "white", "wp1");
  pieces.wp2 = new Pawn("b", 2, "white", "wp2");
  pieces.wp3 = new Pawn("b", 3, "white", "wp3");
  pieces.wp4 = new Pawn("b", 4, "white", "wp4");
  pieces.wp5 = new Pawn("b", 5, "white", "wp5");
  pieces.wp6 = new Pawn("b", 6, "white", "wp6");
  pieces.wp7 = new Pawn("b", 7, "white", "wp7");
  pieces.wr1 = new Rook("a", 0, "white", "wr1");
  pieces.wr2 = new Rook("a", 7, "white", "wr2");
  pieces.wk1 = new Knight("a", 1, "white", "wk1");
  pieces.wk2 = new Knight("a", 6, "white", "wk2");
  pieces.wb1 = new Bishop("a", 2, "white", "wb1");
  pieces.wb2 = new Bishop("a", 5, "white", "wb2");
  pieces.wq = new Queen("a", 3, "white", "wq");
  pieces.wk = new King("a", 4, "white", "wk");
  
  // Initialize HTML interface
  drawGameBoardHTML();
  greetingHTML();
};
Game.prototype.changeTurn = function() {
  if (this.turn === "white") {
    this.turn = "black";
  } else {
    this.turn = "white";
  }
};
Game.prototype.checkForCapture = function(targetRow, targetCol) {
  if (grid[targetRow][targetCol]) {
    if (grid[targetRow][targetCol].type === "King") {
      this.endGame()
    }
    grid[targetRow][targetCol].captured === true;
  }
};
Game.prototype.endGame = function () {
  console.log("Game over");
  game = new Game();
  game.initializeNewGame();
};

// Piece constructor function
function Piece (row, col, color, id) {
  this.row = row;
  this.col = col;
  this.color = color;
  this.id = id;
  this.captured = false;
  grid[row][col] = this;
}
Piece.prototype.move = function (targetRow, targetCol) {
  
  // If the move is legal
  if (this.isLegalMove(targetRow, targetCol) &&
  targetNotOccupiedBySameColor(targetRow, targetCol, this.color) &&
  (this.captured === false) &&
  isColorTurn(this.color)) {
    
    // Check if a piece has been captured
    game.checkForCapture(targetRow, targetCol);
    
    // Replace the position in the grid with the moved piece 
    grid[this.row][this.col] = false;
    this.row = targetRow;
    this.col = targetCol;
    grid[this.row][this.col] = this;

    // Change the player turn
    game.changeTurn();
    
    // Call functions to adjust the graphic display
    drawGameBoardHTML();
    validMove(targetRow, targetCol);
  
  // Case when the move is not legal
  } else {
    // Call functions to alert the user in the graphic display
    notLegalHTML();
    drawGameBoardHTML();
  }
};

// Pawn constructor function
function Pawn (row, col, color, id) {
  Piece.call(this, row, col, color, id);
  this.type = "Pawn";
  this.firstMove = true;
}
Pawn.prototype = Object.create(Piece.prototype);
Pawn.prototype.isLegalMove = function (targetRow, targetCol) {
  
  // Moving diagonally to capture a piece
  if (targetIsOccupied(targetRow, targetCol) &&
  (targetIsAdjacentRow(this.row, targetRow)) &&
  (targetIsNotBackwards(this.row, targetRow, this.color)) &&
  (targetIsDiagonal(this.row, this.col, targetRow, targetCol))) {
    return true;
    
  // Moving forward two squares when it is the pawn's first movement
  } else if ((!targetIsOccupied(targetRow, targetCol)) &&
  (targetIsNotBackwards(this.row, targetRow, this.color)) &&
  targetIsVertical(this.col, targetCol) &&
  (this.firstMove === true) &&
  targetIsTwoSpacesAhead(this.row, targetRow)) {
    this.firstMove = false;
    return true;
  
  // Moving forward by one square to an empty square
  } else if ((!targetIsOccupied(targetRow, targetCol)) &&
  (targetIsAdjacentRow(this.row, targetRow)) &&
  (targetIsNotBackwards(this.row, targetRow, this.color)) &&
  targetIsVertical(this.col, targetCol)) {
    return true;
  } else {
    return false;
  }
};
Pawn.prototype.constructor = Pawn;

// Rook constructor function
function Rook(row, col, color, id) {
  Piece.call(this, row, col, color, id);
  this.type = "Rook";
}
Rook.prototype = Object.create(Piece.prototype);
Rook.prototype.isLegalMove = function(targetRow, targetCol) {
  
  // Horizontal movement
  if (targetIsHorizontal (this.row, targetRow) &&
  targetDoesNotHopHorizontal (this.col, targetCol, this.row)) {
    return true;
  
  // Vertical movement
  } else if (targetIsVertical (this.col, targetCol) &&
  targetDoesNotHopVertical (this.row, targetRow, this.col)) {
    return true;
  } else {
    return false;
  }
};
Rook.prototype.constructor = Rook;

// Knight constructor function
function Knight(row, col, color, id) {
  Piece.call(this, row, col, color, id);
  this.type = "Knight";
}
Knight.prototype = Object.create(Piece.prototype);
Knight.prototype.isLegalMove = function(targetRow, targetCol) {
  
  var startRow = this.row.charCodeAt(0);
  
  // Forward two rows, then left or right one column
  if (targetRow === String.fromCharCode(startRow + 2)) {
    if (targetCol === this.col + 1 || targetCol === this.col - 1) {
      return true;
    } else {
      return false;
    }
    
  // Back two rows, then left or right one column
  } else if (targetRow === String.fromCharCode(startRow - 2)) {
    if (targetCol === this.col + 1 || targetCol === this.col - 1) {
      return true;
    } else {
      return false;
    }
    
  // Forward one row, then left or right two columns
  } else if (targetRow === String.fromCharCode(startRow + 1)) {
    if (targetCol === this.col + 2 || targetCol === this.col - 2) {
      return true;
    } else {
      return false;
    }
  // Back one row, then left or right two columns
  } else if (targetRow === String.fromCharCode(startRow - 1)) {
    if (targetCol === this.col + 2 || targetCol === this.col - 2) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
};
Knight.prototype.constructor = Knight;

// Bishop constructor function
function Bishop(row, col, color, id) {
  Piece.call(this, row, col, color, id);
  this.type = "Bishop";
}
Bishop.prototype = Object.create(Piece.prototype);
Bishop.prototype.isLegalMove = function(targetRow, targetCol) {
  
  // Diagonal movement
  if (targetIsDiagonal(this.row, this.col, targetRow, targetCol) &&
  targetDoesNotHopDiagonal (this.row, this.col, targetRow, targetCol)) {
    return true;
  } else {
    return false;
  }
};
Bishop.prototype.constructor = Bishop;

// Queen constructor function
function Queen(row, col, color, id) {
  Piece.call(this, row, col, color, id);
  this.type = "Queen";
}
Queen.prototype = Object.create(Piece.prototype);
Queen.prototype.isLegalMove = function(targetRow, targetCol) {
  
  // Horizontal movement
  if (targetIsHorizontal (this.row, targetRow) &&
  targetDoesNotHopHorizontal (this.col, targetCol, this.row)) {
    return true;
  
  // Vertical movement
  } else if (targetIsVertical (this.col, targetCol) &&
  targetDoesNotHopVertical (this.row, targetRow, this.col)) {
    return true;
  
  // Diagonal movement
  } else if (targetIsDiagonal(this.row, this.col, targetRow, targetCol) &&
  targetDoesNotHopDiagonal (this.row, this.col, targetRow, targetCol)) {
    return true;
  } else {
    return false;
  }
};
Queen.prototype.constructor = Queen;

// King constructor function
function King(row, col, color, id) {
  Piece.call(this, row, col, color, id);
  this.type = "King";
}
King.prototype = Object.create(Piece.prototype);
King.prototype.isLegalMove = function(targetRow, targetCol) {
  
  // Vertical movement, limited to one square
  if (targetIsVertical (this.col, targetCol) &&
  targetDoesNotHopVertical (this.row, targetRow, this.col) &&
  targetIsAdjacentRow(this.row, targetRow)) {
    return true;
  
  // Horizontal movement, limited to one square
  } else if (targetIsHorizontal (this.row, targetRow) &&
  targetDoesNotHopHorizontal (this.col, targetCol, this.row) &&
  targetIsAdjacentCol(this.col, targetCol)) {
    return true;
  
  // Diagonal movement, limited to one square
  } else if (targetIsDiagonal(this.row, this.col, targetRow, targetCol) &&
  targetDoesNotHopDiagonal (this.row, this.col, targetRow, targetCol) &&
  targetIsAdjacentRow(this.row, targetRow) &&
  targetIsAdjacentCol(this.col, targetCol)) {
    return true;
  } else {
    return false;
  }
};
King.prototype.constructor = King;