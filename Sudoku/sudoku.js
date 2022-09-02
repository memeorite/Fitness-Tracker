function getRow(puzzle, rowNum) {
    // input a puzzle and a row number
    let rowArray = [];
    for (let i = 0; i < puzzle.length; i++) {
      rowArray.push(puzzle[i]); // the numbers returned from the puzzle index will push into rowArray
    }
    return rowArray;
  }
  
  function getColumn(puzzle, colNum) {
    //input a puzzle and a column number
    let columnArray = [];
    for (let j = 0; j < puzzle.length; j++) {
      columnArray.push(puzzle[j][colNum]); //the column number obtained from the puzzle index will push into columnArray
    }
    return columnArray;
  }
  function getSection(puzzle, col, row) {
    //input a puzzle, a column, and a row
    col *= 3; // multiply each column and row by 3 to loop through each section]
    row *= 3;
  
    let secArr = [];
  
    for (let k = row; k < row + 3; k++) {
      for (let m = col; m < col + 3; m++) {}
    }
    return secArr;
  }
  
  function includes1to9(arr) {
    for (let num = 1; num <= 9; num++) if (arr.indexOf(num) === -1) return false;
    return true;
  }
  
  function sudokuIsValid(puzzle) {
    for (let i = 0; i < 9; i++)
      if (
        !includes1to9(getRow(puzzle, i)) ||
        !includes1to9(getColumn(puzzle, i)) ||
        !includes1to9(getSection(puzzle, i, i))
      )
        return false;
    return true;
  }
  
  