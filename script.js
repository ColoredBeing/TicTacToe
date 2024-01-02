document.addEventListener('DOMContentLoaded', function () {
    const board = document.getElementById('board');
    const message = document.getElementById('message');
    const resetButton = document.getElementById('resetButton');
    let currentPlayer = 'X';
    let gameBoard = ['', '', '', '', '', '', '', '', ''];
    let gameActive = true;

    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.className = 'cell';
        cell.setAttribute('data-index', i);
        cell.addEventListener('click', handleCellClick);
        board.appendChild(cell);
    }

    function handleCellClick(event) {
        const clickedCell = event.target;
        const cellIndex = clickedCell.getAttribute('data-index');

        if (gameBoard[cellIndex] === '' && gameActive) {
            gameBoard[cellIndex] = currentPlayer;
            clickedCell.textContent = currentPlayer;
            checkWinner();
            togglePlayer();
        }
    }

    // Toggle between X and O
    function togglePlayer() {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }

    // Check for a winner or a draw
    function checkWinner() {
        const winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6]              // Diagonals
        ];

        for (const combination of winningCombinations) {
            const [a, b, c] = combination;
            if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
                gameActive = false;
                highlightWinner(combination);
                displayMessage(`${currentPlayer} wins!`);
                return;
            }
        }

        if (!gameBoard.includes('')) {
            gameActive = false;
            displayMessage('It\'s a draw!');
        }
    }

    // Highlight win combo
    function highlightWinner(combination) {
        combination.forEach(index => {
            const winningCell = board.children[index];
            winningCell.classList.add('winner');

            // css class for vibrate
            winningCell.classList.add('vibrate');
            setTimeout(() => {
                winningCell.classList.remove('vibrate');
            }, 1000); // Removes after 1 second
        });
    }

    // Display a message on the screen
    function displayMessage(msg) {
        message.textContent = msg;
    }

    // Reset the game
    function resetGame() {
        gameBoard = ['', '', '', '', '', '', '', '', ''];
        gameActive = true;
        currentPlayer = 'X';
        message.textContent = '';
        board.querySelectorAll('.cell').forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('winner');
        });
    }

    // press reset
    resetButton.addEventListener('click', resetGame);
});
