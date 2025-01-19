'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');

module.exports = function (app) {
  
  let solver = new SudokuSolver();

  app.route('/api/check')
	.post((req, res) => {
	

	});
        
  app.route('/api/solve')
    .post((req, res) => {

		const puzzle = req.body.puzzle
		console.log(puzzle);
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
