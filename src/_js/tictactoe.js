// Create the 9 TicTacToe boards
const minimaxExample = document.querySelector('.tictactoe-minimax-example');
const boards = [];

function createTicTacToeBoard(parent, i) {
    const board = document.createElement('div');
    board.classList.add('tictactoe-board');
    board.setAttribute('data-index', i);

    const turn = document.createElement('div');
    turn.classList.add('turn-indicator');
    turn.classList.add(i % 2 === 1 ? 'o-player' : 'x-player');
    board.appendChild(turn);

    for (let j = 0; j < 9; j++) {
        const cell = document.createElement('div');
        cell.classList.add('tictactoe-cell');
        cell.setAttribute('data-cell-index', j);
        cell.setAttribute('data-value', 0);
        cell.onclick = () => {
            const parsedIndex = parseInt(cell.dataset.cellIndex);
            applyMove(i, parsedIndex);
        };
        board.appendChild(cell);
    }

    parent.appendChild(board);
    return board;
}

for (let i = 0; i < 9; i++) {
    const board = createTicTacToeBoard(minimaxExample, i);
    boards.push(board);
}

function resetMinimaxExample() {
    for (let i = 0; i < boards.length; i++) {
        setBoardState(i, [0, 0, 0, 0, 0, 0, 0, 0, 0]);
        boards[i].classList.remove('blocked');
        boards[i].classList.remove('winner');
    }
}

// Reset button
import { animate } from '/js/anime.esm.min.js';

const resetButton = document.createElement('button');
resetButton.classList.add('tictactoe-reset-button');
minimaxExample.appendChild(resetButton);

resetButton.addEventListener('click', () => {
    animate(resetButton, {
        scale: [0.9, 1],
        duration: 400,
        easing: 'easeInOutCubic',
    });
    resetMinimaxExample();
});

// Functions to set and get board state
function setBoardState(boardIndex, state) {
    const board = boards[boardIndex];
    const cells = board.querySelectorAll('.tictactoe-cell');

    state.forEach((value, cellIndex) => {
        const cell = cells[cellIndex];

        // Store numeric state
        cell.setAttribute('data-value', value);

        // Toggle classes
        cell.classList.remove('x-player', 'o-player');
        if (value === 1) cell.classList.add('x-player');
        if (value === -1) cell.classList.add('o-player');
    });
}

function getBoardState(boardIndex) {
    const board = boards[boardIndex];
    const cells = board.querySelectorAll('.tictactoe-cell');

    return Array.from(cells).map((cell) => parseInt(cell.getAttribute('data-value')) || 0);
}

// Apply moves
function applyMove(boardIndex, cellIndex) {
    const prevState = boardIndex > 0 ? getBoardState(boardIndex - 1) : [0, 0, 0, 0, 0, 0, 0, 0, 0];
    const currentState = [...prevState];

    if (currentState[cellIndex] !== 0) return;

    const player = boardIndex % 2 === 0 ? 1 : -1; // We always start with X
    currentState[cellIndex] = player;

    setBoardState(boardIndex, currentState);

    propagateMinimax(boardIndex, currentState);
}

// Minimax
const WIN_PATTERNS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // Rows
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // Columns
    [0, 4, 8],
    [2, 4, 6], // Diagonals
];

function checkIfWon(board) {
    for (const [a, b, c] of WIN_PATTERNS) {
        if (board[a] !== 0 && board[a] === board[b] && board[a] === board[c]) {
            return board[a];
        }
    }
    if (board.every((v) => v !== 0)) return 0;
    return null;
}

function getPossibleMoves(board) {
    const moves = [];
    for (let i = 0; i < 9; i++) {
        if (board[i] === 0) moves.push(i);
    }
    return moves;
}

function minimax(board, depth, maximizing) {
    const result = checkIfWon(board);
    if (result !== null) {
        if (result === 1) return 10 - depth;
        if (result === -1) return depth - 10;
        return 0;
    }

    const moves = getPossibleMoves(board);

    if (maximizing) {
        let best = -Infinity;
        for (const i of moves) {
            board[i] = 1;
            best = Math.max(best, minimax(board, depth + 1, false));
            board[i] = 0;
        }
        return best;
    } else {
        let best = Infinity;
        for (const i of moves) {
            board[i] = -1;
            best = Math.min(best, minimax(board, depth + 1, true));
            board[i] = 0;
        }
        return best;
    }
}

function findBestMove(board, player) {
    let bestScore = player === 1 ? -Infinity : Infinity;
    let bestMoves = [];

    for (const i of getPossibleMoves(board)) {
        board[i] = player;
        const score = minimax(board, 1, player === -1 ? true : false);
        board[i] = 0;

        if ((player === 1 && score > bestScore) || (player === -1 && score < bestScore)) {
            bestScore = score;
            bestMoves = [i];
        } else if (score === bestScore) {
            bestMoves.push(i);
        }
    }

    return bestMoves[Math.floor(Math.random() * bestMoves.length)];
}

function propagateMinimax(startBoardIndex, startState) {
    let state = [...startState];

    // Clear blocked/winner classes from all boards
    for (let i = 0; i < boards.length; i++) {
        boards[i].classList.remove('blocked');
        boards[i].classList.remove('winner');
    }

    for (let i = startBoardIndex + 1; i < boards.length; i++) {
        const player = i % 2 === 0 ? 1 : -1;

        if (checkIfWon(state) !== null) {
            boards[i].classList.add('blocked');
            setBoardState(i, state);
        } else {
            const move = findBestMove(state, player);
            state[move] = player;
            setBoardState(i, state);
        }
    }

    // Highlight winners
    for (let i = 0; i < boards.length; i++) {
        const result = checkIfWon(getBoardState(i));
        if (result === 1 || result === -1) {
            boards[i].classList.add('winner');
        }
    }
}
