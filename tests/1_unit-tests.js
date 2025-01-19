const chai = require('chai');
const assert = chai.assert;

const Solver = require('../controllers/sudoku-solver.js');
let solver = new Solver();
import { puzzlesAndSolutions} from '../controllers/puzzle-strings.js';

suite('Unit Tests', () => {

	let puzzle = puzzlesAndSolutions[0][0]
	let puzzle2 = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..'

	test('Logic handles a valid puzzle string of 81 characters', () => {
		
		assert.isOk(solver.validate(puzzle).result, 'Should return true');

	});

	test('Logic handles a puzzle string with invalid characters', () => {
		
		let invalid_puzzle = '1.5..2.84..63.12.7.2..5..f..9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.';
		assert.equal(solver.validate(invalid_puzzle).result, false, 'Should return when puzzle has letters');

		invalid_puzzle = '1.5..2.84..63.12.7.2..5..,..9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.';
		assert.equal(solver.validate(invalid_puzzle).result, false, 'Should return when puzzle has comma');

	});

	test('Logic handles a puzzle string that is not 81 characters', () => {
		
		let invalid_puzzle = '1.5..2....84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.';
		assert.equal(solver.validate(invalid_puzzle).result, false, 'Should return when puzzle has more than 81 characters');

		invalid_puzzle = '1.5...63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.';
		assert.equal(solver.validate(invalid_puzzle).result, false, 'Should return when puzzle has less than 81 characters');
	});

	test('logic handles valid row placement', () => {

		assert.isOk(solver.checkRowPlacement(puzzle2, 3, 4, 1), 'checkRowPlacement should return true with valid string')

	})

	test('logic handles invalid row placement', () => {

		assert.equal(solver.checkRowPlacement(puzzle2, 1, 1, 1), false, 'checkRowPlacement should false true with invalid string')

	})

	test('logic handles valid column placement', () => {

		assert.isOk(solver.checkColPlacement(puzzle2, 1, 1, 2), 'checkcolPlacement should return true with valid placement')

	})

	test('logic handles invalid column placement', () => {

		assert.equal(solver.checkColPlacement(puzzle2, 1, 1, 1), false, 'checkColPlacement should return false with invalid placement')

	})

	test('logic handles valid grid placement', () => {

		assert.isOk(solver.checkRegionPlacement(puzzle2, 1, 1, 1), 'checkRegionPlacement should return true with valid placement')

	})

	test('logic handles grid column placement', () => {

		assert.equal(solver.checkRegionPlacement(puzzle2, 1, 1, 2), false, 'checkRegionPlacement should return false with invalid placement')

	})

});
