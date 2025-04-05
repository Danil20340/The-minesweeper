interface Cell {
    isMine: boolean;  // Есть ли мина
    isRevealed: boolean; // Открыта ли ячейка
    flagState: 'flag' | 'question' | null;  // Помечена ли меткой
    adjacentMines: number; // Число мин вокру
}

type Board = Cell[][];