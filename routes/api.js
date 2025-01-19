'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');

module.exports = function (app) {
  
  let solver = new SudokuSolver();

  app.route('/api/check')
	.post((req, res) => {
	
		const {puzzle, coordinate, value} = req.body
		if (!puzzle || !coordinate || !value) {
			return res.json({error: 'Required field(s) missing'})
		}

		const validate = solver.validate(puzzle);
		if (!validate.result === true) {
			return res.json({error: validate.error})
		}

		let regex = /^[A-I][1-9]$/;
		if (!regex.test(coordinate)) {
			return res.json({error: 'Invalid coordinate'})
		}

		regex = /^[1-9]$/;
		if (!regex.test(value)) {
			return res.json({error: 'Invalid value'})
		}

		const column = coordinate.slice(1);

		let row = coordinate.slice(0,1);
		row = row.toUpperCase().charCodeAt(0) - 64;

		return res.json(solver.checkPlacement(puzzle, row, column, value))

	});
        
  app.route('/api/solve')
    .post((req, res) => {

		const puzzle = req.body.puzzle
		if (!puzzle) {
			return res.json({error: 'Required field missing'})
		}

		const validate = solver.validate(puzzle);
		if (!validate.result === true) {
			return res.json({error: validate.error})
		}

		return res.json({solution: validate.solution})

    });

};
