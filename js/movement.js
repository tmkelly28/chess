// Functions related to piece movement
function targetIsOccupied(targetRow, targetCol) {
  return grid[targetRow][targetCol];
}
function targetNotOccupiedBySameColor(targetRow, targetCol, color) {
  if (grid[targetRow][targetCol].color === color) {
    return false;
  } else {
    return true;
  }
}
function targetIsAdjacentRow(startRow, targetRow) {
  return (Math.abs(startRow.charCodeAt(0) - targetRow.charCodeAt(0)) === 1);
}
function targetIsAdjacentCol(startCol, targetCol) {
  return (Math.abs(startCol - targetCol) === 1);
}
function targetIsDiagonal(startRow, startCol, targetRow, targetCol) {
  var difference = Math.abs(startRow.charCodeAt(0) - targetRow.charCodeAt(0));
  if (Math.abs(startCol - targetCol) === difference) {
    return true;
  } else {
    return false;
  }
}
function targetIsHorizontal (startRow, targetRow) {
  return (startRow === targetRow);
}
function targetIsVertical (startCol, targetCol) {
  return (startCol === targetCol);
}
function targetIsNotBackwards(startRow, targetRow, color) {
  if (color === "white") {
    if (startRow.charCodeAt(0) - targetRow.charCodeAt(0) < 0) {
      return true;
    } else {
      return false;
    }
  } else if (color === "black") {
    if (startRow.charCodeAt(0) - targetRow.charCodeAt(0) > 0) {
      return true;
    } else {
      return false;
    }
  }
}
function targetDoesNotHopDiagonal (startRow, startCol, targetRow, targetCol) {
  // difference determines how many squares to check
  var difference = Math.abs(startRow.charCodeAt(0) - targetRow.charCodeAt(0)) - 1;
  
  // get the unicode values of the start and target rows, for comparison
  startRow = startRow.charCodeAt(0);
  targetRow = targetRow.charCodeAt(0);
  
  // use the starting row and col for looping through squares
  var row = startRow;
  var col = startCol;
  
  // depending on the direction of movement, check squares for pieces
  if (startRow < targetRow && startCol > targetCol) {
    // northwest movement: increase row, decrease col
    for (var i = 0; i < difference; i++) {
      row += 1;
      col -= 1;
      if (targetIsOccupied(String.fromCharCode(row), col)) {
        return false;
      }
    }
  } else if (startRow < targetRow && startCol < targetCol) {
    // northeast movement: increase row, increase col
    for (var i = 0; i < difference; i++) {
      row += 1;
      col += 1;
      if (targetIsOccupied(String.fromCharCode(row), col)) {
        return false;
      }
    }
  } else if (startRow > targetRow && startCol > targetCol) {
    // southwest movement: decrease row, decrease col
    for (var i = 0; i < difference; i++) {
      row -= 1;
      col -= 1;
      if (targetIsOccupied(String.fromCharCode(row), col)) {
        return false;
      }
    }
  } else if (startRow > targetRow && startCol < targetCol) {
    // southeast movement: decrease row, increase col
    for (var i = 0; i < difference; i++) {
      row -= 1;
      col += 1;
      if (targetIsOccupied(String.fromCharCode(row), col)) {
        return false;
      }
    }
  }
  return true;
} 
function targetDoesNotHopVertical (startRow, targetRow, col) {
  startRow = startRow.toString().charCodeAt(0);
  targetRow = targetRow.toString().charCodeAt(0);
  if (startRow > targetRow) {
    var i = targetRow + 1;
    var j = startRow;
  } else {
    i = startRow + 1;
    j = targetRow;
  }
  for (i; i < j; i++) {
    var row = String.fromCharCode(i);
    if (targetIsOccupied(row, col)) {
      return false;
    }
  }
  return true;
}
function targetDoesNotHopHorizontal (startCol, targetCol, row) {
  if (startCol > targetCol) {
    var i = targetCol + 1;
    var j = startCol;
  } else {
    i = startCol + 1;
    j = targetCol;
  }
  for (i; i < j; i++) {
    if (targetIsOccupied(row, i)) {
      return false;
    }
  }
  return true;
}
function targetIsTwoSpacesAhead(startRow, targetRow) {
  return (Math.abs(startRow.charCodeAt(0) - targetRow.charCodeAt(0)) === 2);
}
function isColorTurn(color) {
  if (color === game.turn) {
    return true;
  } else {
    return false;
  }
}
