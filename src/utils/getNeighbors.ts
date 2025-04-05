export const getNeighbors = (board: Cell[][], x: number, y: number) => {
    const neighbors: { x: number; y: number; cell: Cell }[] = [];

    for (let dx = -1; dx <= 1; dx++) {
        for (let dy = -1; dy <= 1; dy++) {
            if (dx === 0 && dy === 0) continue; // Пропускаем саму клетку
            const newX = x + dx;
            const newY = y + dy;

            if (newX >= 0 && newX < board[0].length && newY >= 0 && newY < board.length) {
                neighbors.push({ x: newX, y: newY, cell: board[newY][newX] });
            }
        }
    }

    return neighbors;
};
