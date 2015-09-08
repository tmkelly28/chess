// Event handlers
$(document).ready(function() {
  var pieceSelected = false;
  var square = $('.square');
  var selected = $('.selected');
  
  // Selecting a square
  square.click(function () {
    if (!game.gameOver) {
      if ($(this).hasClass("selected")) {
        $(this).removeClass("selected");
        pieceSelected = false;
      } else if (pieceSelected === false) {
        $(this).addClass("selected");
        pieceSelected = true;
      }
    }
  });
  
  // Clicking another square after selecting a piece
  square.dblclick(function () {
    // Get the selected piece
    try {
      var gridProp = $('.selected').attr('id')[0];
      var gridIdx = Number($('.selected').attr('id')[1]);
      var selectedPiece = grid[gridProp][gridIdx];

      // Get the target coordinates
      var targetRow = $(this).attr('id')[0];
      var targetCol = Number($(this).attr('id')[1]);
      // invoke the move function on the selected piece with the id of the clicked square
      selectedPiece.move(targetRow, targetCol);
    } catch (error) {
      notLegalHTML();
      console.log("Caught an error");
    }
    // remove the selected class when done
    $('.selected').removeClass('selected');
    pieceSelected = false;
  });
  
  // Show instructions
  $('#instructions').slideDown(1000).delay(3000).slideUp(1000);
});
