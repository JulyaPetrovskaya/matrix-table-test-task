import type { Cell } from '../types/cell';

export function generateMatrix(rows: number, cols: number): Cell[][] {
  if (!rows || !cols) {
    return [];
  }

  const matrix: Cell[][] = [];
  let cellIdCounter = 1;

  for (let i = 0; i < rows; i++) {
    const row: Cell[] = [];

    for (let j = 0; j < cols; j++) {
      const amount = Math.floor(Math.random() * 900) + 100;

      row.push({
        id: cellIdCounter++,
        amount,
      });
    }

    matrix.push(row);
  }

  return matrix;
}
