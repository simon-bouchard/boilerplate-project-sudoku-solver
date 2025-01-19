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

	  const verticalStart = (Math.floor(row - 1 / 3) * 3);
	  const horizontalStart = (Math.floor(column - 1 /3) * 3);
	  const trueStart = verticalStart * 9 + horizontalStart;

	  for (let start = trueStart; start < (trueStart + 9) * 3; start += 9) {
	  	for (let i = start; i < start + 3; i++) {
			if (puzzleString[i] == value) {
				return false
			}
		}
	  }

	  return true
  }

  solve(puzzleString) {
    
  }
}

module.exports = SudokuSolver;

