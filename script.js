const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
let currentPlayer = 'X';
let gameOver = false;

function checkWinner() {
  const winningCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6] // Diagonals
  ];

  for (let combo of winningCombos) {
    const [a, b, c] = combo;
    if (
      cells[a].innerHTML &&
      cells[a].innerHTML === cells[b].innerHTML &&
      cells[a].innerHTML === cells[c].innerHTML
    ) {
      gameOver = true;
      cells[a].classList.add('winner');
      cells[b].classList.add('winner');
      cells[c].classList.add('winner');
      return cells[a].innerHTML;
    }
  }

  if ([...cells].every(cell => cell.innerHTML !== '')) {
    gameOver = true;
    return 'tie';
  }

  return null;
}

function showWinnerMessage(winner) {
  Swal.fire({
    title: 'Congratulations!',
    text: `Player ${winner} wins!`,
    icon: 'success',
    confirmButtonText: 'Play Again'
  }).then((result) => {
    if (result.isConfirmed) {
      resetGame();
    }
  });
}

function handleClick() {
  if (gameOver || this.innerHTML !== '') return;

  this.innerHTML = currentPlayer;
  const winner = checkWinner();

  if (winner) {
    if (winner !== 'tie') {
      showWinnerMessage(winner);
    } else {
      Swal.fire({
        title: 'It\'s a tie!',
        icon: 'info',
        confirmButtonText: 'Play Again'
      }).then((result) => {
        if (result.isConfirmed) {
          resetGame();
        }
      });
    }
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function resetGame() {
  cells.forEach(cell => {
    cell.innerHTML = '';
    cell.classList.remove('winner');
  });
  currentPlayer = 'X';
  gameOver = false;
}

cells.forEach(cell => {
  cell.addEventListener('click', handleClick);
});
