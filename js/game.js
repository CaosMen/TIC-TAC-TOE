function start_game() {
  /* Create matrix board */
  let board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
  ];

  /* Current player based on turn */
  let currentTurn = 0;
  let players = [$('#player-1').val(), $('#player-2').val()];

  /* On click event for board */
  $('td').on('click', (event) => {
    /* Render move and return move object */
    /* MoveObject = {turn: next turn, move: AI move} */
    let return_move = make_move(event.target, board, currentTurn, players);

    if (return_move !== null) {
      /* Update current turn */
      currentTurn = return_move['turn'];
     
      /* Check if the AI ​​made a move */
      if (return_move['move'] !== null) {
        let move = return_move['move'];
        /* Click on the square on the table */
        $(`td[row=${move['row']}][column=${move['col']}]`).click();
      }
    }
  });

  Swal.fire('Game started!').then(() => {
    /* Is the first move from the AI? */
    if (players[currentTurn] == 'computer') {
      move = best_move(board, get_symbol(currentTurn));
      $(`td[row=${move['row']}][column=${move['col']}]`).click();
    }
  });
}

/* Get current player symbol */
function get_symbol(turn) {
  return turn == 0 ? 'X' : 'O';
}

/* Draw move in table */
function make_move(element, board, currentTurn, players) {
  /* Gets the information of the clicked square */
  symbol = element.innerText;
  row = element.getAttribute('row');
  column = element.getAttribute('column');

  /* Available to click? */
  if (symbol == '') {
    /* Get current player symbol */
    current_symbol = get_symbol(currentTurn);

    /* Make move */
    element.innerText = current_symbol;
    board[row][column] = current_symbol;

    /* Check if the game is over */
    let isGameOver = game_over(board);
    if (isGameOver !== null) {
      /* Show message for end of game */
      let message = '';

      if (isGameOver == 'Tie') {
        message = 'The game was a draw!';
      } else {
        message = 'Player ' + (currentTurn + 1) + ' won the match!';
      }

      /* Show message and clear table */
      Swal.fire(message).then(() => {
        clear_table();
        return null;
      });
    } else {
      let move = null;
      let nextTurn = currentTurn ^ 1;
      
      /* Check if the next turn is from AI */
      if (players[nextTurn] == 'computer') {
        move = best_move(board, get_symbol(nextTurn));
      }

      /* Return move object */
      return {turn: nextTurn, move: move};
    }
  } else {
    Swal.fire('This position is already occupied!');
  }
}

/* Game State */
function compare_three(a, b, c) {
  return a == b && b == c && a != '';
}

/* Check if the game is over */
function game_over(board) {
  let winner = null;

  /* Check vertical */
  for (let i = 0; i < 3; i++) {
    if (compare_three(board[0][i], board[1][i], board[2][i])) {
      winner = board[0][i];
    }
  }

  /* Check horizontal */
  for (let i = 0; i < 3; i++) {
    if (compare_three(board[i][0], board[i][1], board[i][2])) {
      winner = board[i][0];
    }
  }

  /* Check diagonal left */
  if (compare_three(board[0][0], board[1][1], board[2][2])) {
    winner = board[0][0];
  }

  /* Check diagonal right */
  if (compare_three(board[2][0], board[1][1], board[0][2])) {
    winner = board[2][0];
  }

  /* Count empty places */
  let openSpots = 0;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i][j] == '') {
        openSpots++;
      }
    }
  }

  if (winner == null && openSpots == 0) {
    return 'Tie';
  } else {
    return winner;
  }
}