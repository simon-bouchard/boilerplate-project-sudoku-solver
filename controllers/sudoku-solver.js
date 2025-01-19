import { puzzlesAndSolutions } from './puzzle-strings.js';

class SudokuSolver {

  validate(puzzleString) {

  	
	const regex = /^[0-9.]+$/

	if (!regex.test(puzzleString)) {
		return {result: false, error: 'Invalid characters in puzzle'}
	}

	if (puzzleString.length != 81) {
		return {result: false, error: 'Expected puzzle to be 81 characters'}
	}

	return {result: true}

  }

  checkRowPlacement(puzzleString, row, column, value) {
	let start = (row - 1) * 9 

	if ([...(puzzleString.slice(start, start + 9))].some((char) => char == value)) {
		return false
	}

	return true
  }

  checkColPlacement(puzzleString, row, column, value) {

	for (let i = column - 1; i < puzzleString.length; i += 9) {
        if (puzzleString[i] == value) {
           	return false; 
            }
    	}

	return true

  }

  checkRegionPlacement(puzzleString, row, column, value) {

	  const verticalStart = Math.floor((row - 1) / 3) * 3;
	  const horizontalStart = Math.floor((column - 1) /3) * 3;
	  const trueStart = verticalStart * 9 + horizontalStart;

	  for (let i = 0; i < 3; i++) {
	  	for (let j = 0; j < 3; j++) {
			const index = trueStart + i * 9 + j;
			if (puzzleString[index] == value) {
				return false
			}
		}
	  }

	  return true
  }

  checkPlacement(puzzleString, row, column, value) {

	  const Region = this.checkRegionPlacement(puzzleString, row, column, value);
	  const Row = this.checkRowPlacement(puzzleString, row, column, value);
	  const Col = this.checkColPlacement(puzzleString, row, column, value);

	  if (Col && Row && Region) {
		  return {valid: true}
	  }

	  const conflict = [];

	  if (!Row) {
		  conflict.push('row')
	  }
	  if (!Col) {
		  conflict.push('column');
	  }
	  if (!Region) {
		  conflict.push('region');
	  }
	  return {valid: false, conflict: conflict}

  }
  solve(puzzleString) {
    
  }
}

module.exports = SudokuSolver;

