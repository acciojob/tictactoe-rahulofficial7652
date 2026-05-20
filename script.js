//your JS code here. If required.
// DOM Elements selection
const setupScreen = document.getElementById('setup-screen');
const gameScreen = document.getElementById('game-screen');
const submitBtn = document.getElementById('submit');
const player1Input = document.getElementById('player-1');
const player2Input = document.getElementById('player-2');
const messageDiv = document.querySelector('.message');
const cells = document.querySelectorAll('.cell');

let p1Name = "";
let p2Name = "";
let currentPlayer = "x"; // 'x' for Player 1, 'o' for Player 2
let isGameActive = true;
let boardState = ["", "", "", "", "", "", "", "", ""];

// Winning combinations map (0-indexed to match boardState array)
const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Horizontals
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Verticals
    [0, 4, 8], [2, 4, 6]             // Diagonals
];

// 1. Game Start karne ka event
submitBtn.addEventListener('click', () => {
    p1Name = player1Input.value.trim();
    p2Name = player2Input.value.trim();

    if (p1Name === "" || p2Name === "") {
        alert("Please enter names for both players.");
        return;
    }

    // Screens toggle karna
    setupScreen.classList.add('hide');
    gameScreen.classList.remove('hide');

    // Initial turn message display karna
    messageDiv.textContent = `${p1Name}, you're up`;
});

// 2. Cell Click Handle karne ka logic
cells.forEach(cell => {
    cell.addEventListener('click', () => {
        const cellIndex = parseInt(cell.id) - 1;

        // Agar cell bhara hua hai ya game khatam ho chuki hai to click na ho
        if (boardState[cellIndex] !== "" || !isGameActive) {
            return;
        }

        // State update aur screen par text render karna
        boardState[cellIndex] = currentPlayer;
        cell.textContent = currentPlayer;

        // Validation check karna
        checkResult();
    });
});

// 3. Win / Draw evaluation logic
function checkResult() {
    let roundWon = false;

    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        const winnerName = currentPlayer === 'x' ? p1Name : p2Name;
        messageDiv.textContent = `${winnerName}, congratulations you won!`;
        isGameActive = false;
        return;
    }

    // Draw conditions handling
    if (!boardState.includes("")) {
        messageDiv.textContent = "It's a draw!";
        isGameActive = false;
        return;
    }

    // Turn switch karna agar round active h
    currentPlayer = currentPlayer === 'x' ? 'o' : 'x';
    const nextPlayerName = currentPlayer === 'x' ? p1Name : p2Name;
    messageDiv.textContent = `${nextPlayerName}, you're up`;
}