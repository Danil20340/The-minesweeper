

export function generateBoard(width: number, height: number, mineCount: number, safeX: number, safeY: number): Board {
    // Создаем пустое поле
    let board: Board = Array.from({ length: height }, () =>
        Array.from({ length: width }, () => ({
            isMine: false,
            isRevealed: false,
            flagState: null,
            adjacentMines: 0
        }))
    );

    // Расставляем мины случайным образом, избегая первой нажатой клетки
    let minesPlaced = 0;
    while (minesPlaced < mineCount) {
        const x = Math.floor(Math.random() * width);
        const y = Math.floor(Math.random() * height);

        if (board[y][x].isMine || (x === safeX && y === safeY)) {
            continue; // Пропускаем, если мина уже есть или это первая нажатая клетка
        }

        board[y][x].isMine = true;
        minesPlaced++;
    }

    // Подсчитываем число мин вокруг каждой ячейки
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            if (board[y][x].isMine) continue;

            let count = 0;
            for (let dy = -1; dy <= 1; dy++) {
                for (let dx = -1; dx <= 1; dx++) {
                    const ny = y + dy, nx = x + dx;
                    if (ny >= 0 && ny < height && nx >= 0 && nx < width && board[ny][nx].isMine) {
                        count++;
                    }
                }
            }
            board[y][x].adjacentMines = count;
        }
    }

    return board;
}
