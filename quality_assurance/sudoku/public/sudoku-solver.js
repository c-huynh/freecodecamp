const textArea = document.getElementById('text-input');
const clearBtn = document.getElementById('clear-button');
const solveBtn = document.getElementById('solve-button');
const inputCells = document.querySelectorAll('.sudoku-input');
// import { puzzlesAndSolutions } from './puzzle-strings.js';

const coordToIndex = coord => {
    const letter = coord[0];
    const digit = parseInt(coord[1]);
    const factor = {
        'A': 0,
        'B': 1,
        'C': 2,
        'D': 3,
        'E': 4,
        'F': 5,
        'G': 6,
        'H': 7,
        'I': 8
    };

    return factor[letter] * 9 + (digit - 1);
};

const indexToCoord = index => {
    const letters = {
        0: 'A',
        1: 'B',
        2: 'C',
        3: 'D',
        4: 'E',
        5: 'F',
        6: 'G',
        7: 'H',
        8: 'I'
    }
    const letter = letters[Math.floor(index / 9)];
    const digit = index % 9 + 1;
    return letter + digit;
}

const clear = () => {
    textArea.value = '';
    inputCells.forEach(input => {
        input.value = '';
    })
    return;
}

const isValidInput = input => {
    const validInput = /^[1-9]$/; // once character between 1-9
    return validInput.test(input);
}

const handleInputCellChange = event => {
    if (textArea.value === '') {
        textArea.value = '.................................................................................'
    }

    var index = coordToIndex(event.currentTarget.id);
    var textAreaArray = textArea.value.split('');
    if (isValidInput(event.currentTarget.value)) {
        textAreaArray[index] = event.currentTarget.value;
    } else if (event.currentTarget.value === '') {
        textAreaArray[index] = '.';
    }
    textArea.value = textAreaArray.join('');
    
    return;
}

const initializeInputCells = () => {
    inputCells.forEach(input => {
        input.oninput = handleInputCellChange;
    })
    return;
}

const handleTextAreaChange = () => {
    if (textArea.value.length === 81) {
        textArea.value.split('').forEach((input, i) => {
            const coord = indexToCoord(i);
            const cell = document.querySelector(`#${coord}`);
            if (isValidInput(input)) {
                cell.value = input;
            } else if (input === '.') {
                cell.value = ''
            }
        })
    }
}

const updateSudokuGrid = sudokuStr => {
    sudokuStr.split('').forEach((input, i) => {
        const coord = indexToCoord(i);
        const cell = document.querySelector(`#${coord}`);
        if (input !== '.') {
            cell.value = parseInt(input);
        }
    })
}

const parseSudokuStr = sudokuStr => {
    const errorDiv = document.querySelector('#error-msg');
    var sudokuGrid = [];
    var parsedRow;
    
    if (sudokuStr.length !== 81) {
        errorDiv.innerHTML = 'Error: Expected puzzle to be 81 characters long.';
        return {value: 'Error'};
    }
    
    errorDiv.innerHTML = '';
    for (let i = 0; i < 9; i++) {
        parsedRow = [];
        for (let j = 0; j < 9; j++) {
            parsedRow.push(sudokuStr[9 * i + j]);
        }
        sudokuGrid.push(parsedRow);
    }
    return {value: sudokuGrid};
}

const getAllRows = parsedSudoku => {
    return parsedSudoku.value;
}

const getAllCols = parsedSudoku => {
    const grid = parsedSudoku.value;
    var cols = [];
    var col;
    
    for (let i = 0; i < 9; i++) {
        col = [];
        for (let j = 0; j < 9; j++) {
            col.push(grid[j][i]);
        }
        cols.push(col);
    }
    return cols;
}

const getAllSubGrids = parsedSudoku => {
    const grid = parsedSudoku.value;
    var subGrids = [];
    var subGrid;
    
    for (let subRow = 0; subRow < 3; subRow++) {
        for (let subCol = 0; subCol < 3; subCol++) {
            subGrid = [];
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    subGrid.push(grid[3 * subRow + i][3 * subCol + j]);
                }
            }
            subGrids.push(subGrid);
        }
    }
    return subGrids;
}

const isValidPuzzle = parsedSudoku => {
    const allRows = getAllRows(parsedSudoku);
    const allCols = getAllCols(parsedSudoku);
    const allSubGrids = getAllSubGrids(parsedSudoku);
    const digits = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
    var valid = true;
    
    allRows.forEach(row => {
        const sorted = [...row].sort();
        digits.forEach((digit, i) => {
            if (sorted[i] !== digit) {
                valid = false;
            }
        })
    })
    
    allCols.forEach(col=> {
        const sorted = [...col].sort();
        digits.forEach((digit, i) => {
            if (sorted[i] !== digit) {
                valid = false;
            }
        })
    })
    
    allSubGrids.forEach(subGrid => {
        const sorted = [...subGrid].sort();
        digits.forEach((digit, i) => {
            if (sorted[i] !== digit) {
                valid = false;
            }
        })
    })
    
    return valid;
}

const checkRow = (digit, row, grid) => {
    const currentRow = grid[row];
    for (let i = 0; i < currentRow.length; i++) {
        if (parseInt(currentRow[i]) === digit) {
            return false;
        }
    }
    return true;
}

const checkCol = (digit, col, grid) => {
    const currentCol = [];
    grid.forEach(row => {
        currentCol.push(row[col]);
    })
    for (let i = 0; i < currentCol.length; i++) {
        if (parseInt(currentCol[i]) === digit) {
            return false
        }
    }
    return true;
}

const checkSubGrid = (digit, row, col, grid) => {
    const subRow = Math.floor(row / 3);
    const subCol = Math.floor(col / 3);
    const subGrid = [];
    
    for (let i = 0; i < 3; i++){
        for (let j = 0; j < 3; j++) {
            subGrid.push(grid[subRow * 3 + i][subCol * 3 + j]);
        }
    }
    
    for (let i = 0; i < subGrid.length; i++) {
        if (parseInt(subGrid[i]) === digit) {
            return false;
        }
    }
    return true;
}

// const input = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
// const parsedSudoku = parseSudokuStr(input);
// console.log(parsedSudoku);

const solve = grid => {
    var attemptSolve;
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (grid[row][col] === '.') {
                for (let input = 1; input < 10; input++) {
                    if (checkRow(input, row, grid) &&
                        checkCol(input, col, grid) &&
                        checkSubGrid(input, row, col, grid)) {
                        grid[row][col] = `${input}`;
                        attemptSolve = solve(grid);
                        if (attemptSolve === false) {
                            grid[row][col] = '.';
                        } else {
                            break;
                        }
                    }
                }
                
                if (grid[row][col] === '.') {
                    return false;
                }
            }
        }
    }
    return grid;
}

const gridToStr = grid => {
    var sudokuStr = [];
    grid.forEach(row => {
        row.forEach(col => {
            sudokuStr.push(col);
        })
    })
    return sudokuStr.join('');
}

const handleSolveClick = () => {
    const sudokuStr = textArea.value;
    const grid = parseSudokuStr(sudokuStr).value;
    if (grid !== 'Error') {
        const solved = solve(grid);
        const sudokuStr = gridToStr(solved);
        textArea.value = sudokuStr;
        updateSudokuGrid(sudokuStr);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // Load a simple puzzle into the text area
    textArea.value = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';

    initializeInputCells();
    updateSudokuGrid(textArea.value);
    
    textArea.oninput = handleTextAreaChange;
    clearBtn.onclick = clear;
    solveBtn.onclick = handleSolveClick;
    
});

/*
  Export your functions for testing in Node.
  Note: The `try` block is to prevent errors on
  the client side
*/
try {
    module.exports = {
        clear,
        indexToCoord,
        isValidInput,
        handleInputCellChange,
        parseSudokuStr,
        isValidPuzzle,
        solve,
        handleSolveClick
    }
} catch (e) {}