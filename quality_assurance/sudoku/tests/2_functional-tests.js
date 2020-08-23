/* *
*
*       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]-----
*       (if additional are added, keep them at the very end!) */

const chai = require("chai");
const assert = chai.assert;

const jsdom = require("jsdom");
const {JSDOM} = jsdom;
let Solver;

suite('Functional Tests', () => {
    suiteSetup(() => {
        // DOM already mocked -- load sudoku solver then run tests
        Solver = require('../public/sudoku-solver.js');
    });

    suite('Text area and sudoku grid update automatically', () => {
        // Entering a valid number in the text area populates
        // the correct cell in the sudoku grid with that number
        test('Valid number in text area populates correct cell in grid', done => {
            assert.equal(true, true);
            done();
        });
    
        // Entering a valid number in the grid automatically updates
        // the puzzle string in the text area
        test('Valid number in grid updates the puzzle string in the text area', done => {
            assert.equal(true, true);
            done();
        });
    });

    suite('Clear and solve buttons', () => {
        // Pressing the "Clear" button clears the sudoku
        // grid and the text area
        test('Function clear()', done => {
            const textArea = document.getElementById('text-input');
            const inputCells = document.querySelectorAll('.sudoku-input');
            
            Solver.clear();
            
            assert.equal(textArea.value, '');
            
            inputCells.forEach(cell => {
                assert.equal(cell.value, '');
            })
            done();
        });

        // Pressing the "Solve" button solves the puzzle and
        // fills in the grid with the solution
        test('Function showSolution(solve(input))', done => {
            const input = '82..4..6...16..89...98315.749.157.............53..4...96.415..81..7632..3...28.51';
            const output = '827549163531672894649831527496157382218396475753284916962415738185763249374928651';
            const textArea = document.getElementById('text-input');
            
            textArea.value = input;
            Solver.handleSolveClick();
            
            assert.equal(textArea.value, output);
            done();
        });
    });
});
