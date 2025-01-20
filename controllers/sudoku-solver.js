import { puzzlesAndSolutions } from './puzzle-strings.js';

class SudokuSolver {

  validate(puzzleString) {

  	
	const regex = /^[0-9.]+$/

	if (!regex.test(puzzleString)) {
		return {result: false, error: 'Invalid characters in puzzle'}
	}

	if (puzzleString.length != 81) {
		return {result: false, error: 'Expected puzzle to be 81 characters long'}
	}

	return {result: true}

  }

  checkRowPlacement(puzzleString, row, column, value) {
	let start = (row - 1) * 9 
    const currentIndex = (row - 1) * 9 + (column - 1);

	for (let i = start; i < start + 9; i++) {
		if (i == currentIndex) {
			continue
		}

		if (puzzleString[i] == value) {
			return false
		}
	}

	return true
  }

  checkColPlacement(puzzleString, row, column, value) {

	const currentIndex = (row - 1) * 9 + (column - 1);

	for (let i = column - 1; i < puzzleString.length; i += 9) {
		if (i == currentIndex) {
			continue
		}

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
	  const currentIndex = (row - 1) * 9 + (column - 1);

	  for (let i = 0; i < 3; i++) {
	  	for (let j = 0; j < 3; j++) {
			const index = trueStart + i * 9 + j;
			if (index == currentIndex) {
				continue
			}
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

  findNextEmpty(puzzleString) {
	  for (let i = 0; i < puzzleString.length; i++) {
		  if (puzzleString[i] == '.') {
			  return i
		  }
	  }

	  return null
  }	

  solve(puzzleString) {

	  const empty = this.findNextEmpty(puzzleString)
	  if (empty === null) {
   		return puzzleString 
	  }

	  const row = Math.floor(empty / 9) + 1
	  const column = empty % 9 + 1

	  for (let i = 1; i < 10; i++) {
		 if (this.checkPlacement(puzzleString, row, column, i).valid) {

			 const puzzleArray = [...puzzleString];
			 puzzleArray[empty] = i.toString();

			 const newPuzzleString = this.solve(puzzleArray.join(''))
			 if (newPuzzleString) {
				 return newPuzzleString
			 }
			 
		 }
	  }

	  return false
  }
}

module.exports = SudokuSolver;

