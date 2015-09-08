// Functions related to GUI in Console
function drawGameBoardConsole() {
  document.getElementById("chess").innerHTML = "";
  var result = "&nbsp;&nbsp;&nbsp;0&nbsp;1&nbsp;2&nbsp;3&nbsp;4&nbsp;5&nbsp;6&nbsp;7&nbsp;<br>";
  for (var prop in grid) {
    result += "<br>"
    result += prop + "&nbsp;&nbsp;";
    for (var i = 0; i < grid[prop].length; i++) {
      if (grid[prop][i] === false) {
        result += "0&nbsp;";
      } else if (grid[prop][i].type === "Pawn") {
        result += "p&nbsp;";
      } else if (grid[prop][i].type === "Rook") {
        result += "r&nbsp;";
      } else if (grid[prop][i].type === "Knight") {
        result += "k&nbsp;";
      } else if (grid[prop][i].type === "Bishop") {
        result += "b&nbsp;";
      } else if (grid[prop][i].type === "Queen") {
        result += "q&nbsp;";
      } else if (grid[prop][i].type === "King") {
        result += "+&nbsp;";
      }
    }
  }
  //console.log(result);
  document.getElementById("chess").innerHTML = result;
}

// Functions related to GUI in HTML
var viewer = $('#viewer');
function drawPieceHTML(gridLocation, piece, white, black) {
  if (piece.color === "white") {
    $(gridLocation).html(images[white]);
  } else if (piece.color === "black") {
    $(gridLocation).html(images[black]);
  }
}
function drawGameBoardHTML() {
  for (var prop in grid) {
    for (var i = 0; i < grid[prop].length; i++) {
      var gridLocation = "#" + prop + i.toString();
      if (grid[prop][i] === false) {
        $(gridLocation).html('');
      } else if (grid[prop][i].type === "Pawn") {
        drawPieceHTML(gridLocation, grid[prop][i], "whitePawn", "blackPawn");
      } else if (grid[prop][i].type === "Rook") {
        drawPieceHTML(gridLocation, grid[prop][i], "whiteRook", "blackRook");
      } else if (grid[prop][i].type === "Knight") {
        drawPieceHTML(gridLocation, grid[prop][i], "whiteKnight", "blackKnight");
      } else if (grid[prop][i].type === "Bishop") {
        drawPieceHTML(gridLocation, grid[prop][i], "whiteBishop", "blackBishop");
      } else if (grid[prop][i].type === "Queen") {
        drawPieceHTML(gridLocation, grid[prop][i], "whiteQueen", "blackQueen");
      } else if (grid[prop][i].type === "King") {
        drawPieceHTML(gridLocation, grid[prop][i], "whiteKing", "blackKing");
      }
    }
  }
}
function greetingHTML() {
  viewer.html("Welcome to Chess!" +
              "<br />" +
              "White moves first.");
}
function notLegalHTML() {
  viewer.html('Not a legal move.' +
             "<br />" +
              game.turn + "'s turn");
}
function validMoveHTML(targetRow, targetCol) {
  viewer.html("Moved to: " + 
              targetRow.toString().toUpperCase() + 
              (targetCol + 1).toString() +
              "<br />" +
              game.turn + "'s turn");
}
function endGameHTML() {
  viewer.html("Game over" +
              "<br />" +
              game.turn + " is the winner!")
}