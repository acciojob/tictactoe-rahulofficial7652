const setupScreen = document.getElementById('setup-screen');
const gameScreen = document.getElementById('game-screen');
const submitBtn = document.getElementById('submit');
// Fixed Selectors
const player1Input = document.getElementById('player1');
const player2Input = document.getElementById('player2');
const messageDiv = document.querySelector('.message');
const cells = document.querySelectorAll('.cell');

let p1Name = "";
let p2Name = "";
let currentPlayer = "x"; 
let isGameActive = true;
let boardState = ["", "", "", "", "", "", "", "", ""];

const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], 
    [0, 3, 6], [1, 4, 7], [2, 5, 8], 
    [0, 4, 8], [2, 4, 6]             
];

submitBtn.addEventListener('click', () => {
    p1Name = player1Input.value.trim();
    p2Name = player2Input.value.trim();

    if (p1Name === "" || p2Name === "") {
        return;
    }

    setupScreen.classList.add('hide');
    gameScreen.classList.remove('hide');

    // Test format ke mutabik: "Player1, you're up"
    messageDiv.textContent = `${p1Name}, you're up`;
});

cells.forEach(cell => {
    cell.addEventListener('click', () => {
        const cellIndex = parseInt(cell.id) - 1;

        if (boardState[cellIndex] !== "" || !isGameActive) {
            return;
        }

        boardState[cellIndex] = currentPlayer;
        cell.textContent = currentPlayer;

        checkResult();
    });
});

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
        // Comma hata diya test runner ki strict demand ke mutabik
        messageDiv.textContent = `${winnerName} congratulations you won!`;
        isGameActive = false;
        return;
    }

    if (!boardState.includes("")) {
        messageDiv.textContent = "It's a draw!";
        isGameActive = false;
        return;
    }

    currentPlayer = currentPlayer === 'x' ? 'o' : 'x';
    const nextPlayerName = currentPlayer === 'x' ? p1Name : p2Name;
    messageDiv.textContent = `${nextPlayerName}, you're up`;
}