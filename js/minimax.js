/* Get the best possible move */
function best_move(board, ai_symbol) {
  /* The first move is to maximize */
  let bestScore = -Infinity;
  /* Best move */
  let move_row, move_col;

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i][j] == '') {
        /* AI turn move */
        board[i][j] = ai_symbol;
        /* Get the score for this move */
        let score = minimax(board, ai_symbol, 0, false);
        /* Remove move */
        board[i][j] = '';
        /* Always keep the best move saved */
        if (score > bestScore) {
          bestScore = score;
          move_row = i;
          move_col = j;
        }
      }
    }
  }
  
  return {row: move_row, col: move_col};
}

function minimax(board, ai_symbol, depth, isMaximizing) {
  /* Check if game over */
  let result = game_over(board);
  /* Return points based on result */
  if (result !== null) {
    if (result == 'Tie') {
      return 0;
    } else {
      return result == ai_symbol ? 10 : -10;
    }
  }

  /* Is maximizing or minimizing */
  if (isMaximizing) {
    let bestScore = -Infinity;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j] == '') {
          /* AI turn move */
          board[i][j] = ai_symbol;
          /* Minimizing */
          let score = minimax(board, ai_symbol, depth + 1, false);
          /* Remove move */
          board[i][j] = '';
          bestScore = Math.max(score, bestScore);
        }
      }
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j] == '') {
          /* Another player's turn move */
          board[i][j] = ai_symbol == 'O' ? 'X' : 'O';
          /* Maximizing */
          let score = minimax(board, ai_symbol, depth + 1, true);
          /* Remove move */
          board[i][j] = '';
          bestScore = Math.min(score, bestScore);
        }
      }
    }
    return bestScore;
  }
}