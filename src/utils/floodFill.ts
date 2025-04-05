export function floodFill(board: Cell[][], x: number, y: number) {
  if (board[y][x].isRevealed || board[y][x].flagState) return;

  board[y][x].isRevealed = true;

  if (board[y][x].adjacentMines === 0) {
    for (let dy = -1; dy <= 1; dy++) {
      for (let dx = -1; dx <= 1; dx++) {
        const nx = x + dx, ny = y + dy;
        if (ny >= 0 && ny < board.length && nx >= 0 && nx < board[0].length) {
          floodFill(board, nx, ny);
        }
      }
    }
  }
  return board;
}
