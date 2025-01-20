const chai = require("chai");
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server');
import { puzzlesAndSolutions } from '../controllers/puzzle-strings.js';

chai.use(chaiHttp);

suite('Functional Tests', () => {

	const puzzle = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..'
	const puzzle2 = puzzlesAndSolutions[0][0];
	const solution2 = puzzlesAndSolutions[0][1]
	const invalid_char_puzzle = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6.f'
	const invalid_len_puzzle = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6...'
	const invalidPuzzle = '..9..5.1.85.4....2432.42.1...69.83.9..3...6.62.71.4..9......1945....4.37.4.3..6..'

	test('Solve puzzle with valid puzzle string', (done) => {

		chai
			.request(server)
			.keepOpen()
			.post('/api/solve')
			.send({
				puzzle: puzzle2
			})
			.end((err, res) => {
				assert.equal(res.body.solution, solution2, 'Should respond with the expected solution')
				done()
			})

	})

	test('Solve a puzzle with missing string', (done) => {
		chai
			.request(server)
			.keepOpen()
			.post('/api/solve')
			.end((err, res) => {
				assert.equal(res.body.error, 'Required field missing', 'Should respond with an error if missing puzzle')
				done()
			})
	})

	test('Solve a puzzle with invalid characters', (done) => {
		chai
			.request(server)
			.keepOpen()
			.post('/api/solve')
			.send({
				puzzle: invalid_char_puzzle
			})
			.end((err, res) => {
				assert.equal(res.body.error, 'Invalid characters in puzzle', 'Should respond with an error if invalid characters in puzzle')
				done()
			})
	})

	test('Solve a puzzle with invalid length', (done) => {
		chai
			.request(server)
			.keepOpen()
			.post('/api/solve')
			.send({
				puzzle: invalid_len_puzzle
			})
			.end((err, res) => {
				assert.equal(res.body.error, 'Expected puzzle to be 81 characters long', 'Should respond with an error if incorrect puzzle length')
				done()
			})
	})

	test('Solve a puzzle that cannont be solved', (done) => {
		chai
			.request(server)
			.keepOpen()
			.post('/api/solve')
			.send({
				puzzle: invalidPuzzle
			})
			.end((err, res) => {
				assert.equal(res.body.error, 'Puzzle cannot be solved', 'Should respond with an error if puzzle is not solvable')
				done()
			})
	})

	test('Check a puzzle placement with all fields', (done) => {
		chai
			.request(server)
			.keepOpen()
			.post('/api/check')
			.send({
				puzzle: puzzle,
				coordinate: 'A1',
				value: 7
			})
			.end((err, res) => {
				assert.equal(res.body.valid, true, 'Should respond with an error if placement is correct')
				done()
			})
	})

	test('Check a puzzle placement with a single placement conflict', (done) => {
		chai
			.request(server)
			.keepOpen()
			.post('/api/check')
			.send({
				puzzle: puzzle,
				coordinate: 'A1',
				value: 2
			})
			.end((err, res) => {
				assert.equal(res.body.valid, false, 'Should respond with an error if invalid placement')
				assert.deepEqual(res.body.conflict, ['region'], 'Should identify conflict')
				done()
			})
	})

	test('Check a puzzle placement with multiple placement conflicts', (done) => {
		chai
			.request(server)
			.keepOpen()
			.post('/api/check')
			.send({
				puzzle: puzzle,
				coordinate: 'A1',
				value: 1
			})
			.end((err, res) => {
				assert.equal(res.body.valid, false, 'Should respond with an error if invalid placement')
				assert.deepEqual(res.body.conflict, ['row', 'column'], 'Should identify all conflicts')
				done()
			})
	})

	test('Check a puzzle placement with all placement conflicts', (done) => {
		chai
			.request(server)
			.keepOpen()
			.post('/api/check')
			.send({
				puzzle: puzzle,
				coordinate: 'B3',
				value: 2
			})
			.end((err, res) => {
				assert.equal(res.body.valid, false, 'Should respond with an error if invalid placement')
				assert.deepEqual(res.body.conflict, ['row', 'column', 'region'], 'Should identify all conflicts')
				done()
			})
	})

	test('Check a puzzle placement with missing required fields', (done) => {
		chai
			.request(server)
			.keepOpen()
			.post('/api/check')
			.send({
				coordinate: 'B3',
				value: 2
			})
			.end((err, res) => {
				assert.equal(res.body.error, 'Required field(s) missing', 'Should respond with an error if required filed missing')
				done()
			})
	})

	test('Check a puzzle placement with invalid characters', (done) => {
		chai
			.request(server)
			.keepOpen()
			.post('/api/check')
			.send({
				puzzle: invalid_char_puzzle,
				coordinate: 'B3',
				value: 2
			})
			.end((err, res) => {
				assert.equal(res.body.error, 'Invalid characters in puzzle', 'Should respond with an error if required filed missing')
				done()
			})
	})

	test('Check a puzzle placement with missing required fields', (done) => {
		chai
			.request(server)
			.keepOpen()
			.post('/api/check')
			.send({
				puzzle: invalid_len_puzzle,
				coordinate: 'B3',
				value: 2
			})
			.end((err, res) => {
				assert.equal(res.body.error, 'Expected puzzle to be 81 characters long', 'Should respond with an error if puzzle is not 81 charaters long')
				done()
			})
	})

	test('Check a puzzle placement with invalid coordinate', (done) => {
		chai
			.request(server)
			.keepOpen()
			.post('/api/check')
			.send({
				puzzle: puzzle,
				coordinate: 'B33',
				value: 2
			})
			.end((err, res) => {
				assert.equal(res.body.error, 'Invalid coordinate', 'Should respond with an error if coordinate is invalid')
				done()
			})
	})

	test('Check a puzzle placement with invalid value', (done) => {
		chai
			.request(server)
			.keepOpen()
			.post('/api/check')
			.send({
				coordinate: 'B3',
				puzzle: puzzle,
				value: 'r'
			})
			.end((err, res) => {
				assert.equal(res.body.error, 'Invalid value', 'Should respond with an error if value is invalid')
				done()
			})
	})

});

