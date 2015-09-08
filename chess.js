// Grid object - contains the source of truth for where Piece objects are located
var grid = {
  h: [false, false, false, false, false, false, false, false],
  g: [false, false, false, false, false, false, false, false],
  f: [false, false, false, false, false, false, false, false],
  e: [false, false, false, false, false, false, false, false],
  d: [false, false, false, false, false, false, false, false],
  c: [false, false, false, false, false, false, false, false],
  b: [false, false, false, false, false, false, false, false],
  a: [false, false, false, false, false, false, false, false]
};
// Pieces library - contains references to the instantiated Piece objects so that they can be accessed outside the Game object
var pieces = {};
// Images library - contains the html for the piece images
var images = {
  whitePawn: '<img src="images/wpawn.svg" />',
  whiteRook: '<img src="images/wrook.svg" />',
  whiteKnight: '<img src="images/wknight.svg" />',
  whiteBishop: '<img src="images/wbishop.svg" />',
  whiteQueen: '<img src="images/wqueen.svg" />',
  whiteKing: '<img src="images/wking.svg" />',
  blackPawn: '<img src="images/bpawn.svg" />',
  blackRook: '<img src="images/brook.svg" />',
  blackKnight: '<img src="images/bknight.svg" />',
  blackBishop: '<img src="images/bbishop.svg" />',
  blackQueen: '<img src="images/bqueen.svg" />',
  blackKing: '<img src="images/bking.svg" />',
}

// Starts a new game on page load
$(document).ready(function() {
  var game = new Game();
  game.initializeNewGame();
});