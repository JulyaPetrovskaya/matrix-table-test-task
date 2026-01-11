import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { Cell } from '../types/cell';
import { generateMatrix } from '../utils/generateMatrix';

type MatrixContextType = {
  rows: number;
  cols: number;
  x: number;
  matrix: Cell[][];
  highlightedIds: number[];
  hoveredRowIndex: number | null;

  setRows: (v: number) => void;
  setCols: (v: number) => void;
  setX: (v: number) => void;

  generate: () => void;
  handleCellClick: (row: number, col: number) => void;
  handleCellHover: (cell: Cell) => void;
  handleCellLeave: () => void;
  handleRowSumHover: (rowIndex: number) => void;
  handleRowSumLeave: () => void;
  handleRemoveRow: (rowIndex: number) => void;
  handleAddRow: () => void;
};

const MatrixContext = createContext<MatrixContextType | null>(null);

export const MatrixProvider = ({ children }: { children: ReactNode }) => {
  const [rows, setRows] = useState(0);
  const [cols, setCols] = useState(0);
  const [x, setX] = useState(0);
  const [matrix, setMatrix] = useState<Cell[][]>([]);
  const [highlightedIds, setHighlightedIds] = useState<number[]>([]);
  const [hoveredRowIndex, setHoveredRowIndex] = useState<number | null>(null);
  const [hoveredCellId, setHoveredCellId] = useState<number | null>(null);

  const generate = () => {
    setMatrix(generateMatrix(rows, cols));
  };

  useEffect(() => {
    if (hoveredCellId === null) {
      setHighlightedIds([]);
      return;
    }

    const allCells = matrix.flat();
    const hoveredCell = allCells.find((c) => c.id === hoveredCellId);
    if (!hoveredCell) return;

    const sortedByDistance = allCells
      .filter((cell) => cell.id !== hoveredCellId)
      .sort(
        (a, b) =>
          Math.abs(a.amount - hoveredCell.amount) -
          Math.abs(b.amount - hoveredCell.amount)
      );

    const nearest = sortedByDistance.slice(0, x).map((cell) => cell.id);
    setHighlightedIds(nearest);
  }, [matrix, hoveredCellId, x]);

  const handleCellClick = (rowIndex: number, colIndex: number) => {
    setMatrix((prev) =>
      prev.map((row, r) =>
        row.map((cell, c) =>
          r === rowIndex && c === colIndex
            ? { ...cell, amount: cell.amount + 1 }
            : cell
        )
      )
    );
  };

  const handleCellHover = (cell: Cell) => {
    setHoveredCellId(cell.id);
  };

  const handleCellLeave = () => {
    setHoveredCellId(null);
    setHighlightedIds([]);
  };

  const handleRowSumHover = (rowIndex: number) => {
    setHoveredRowIndex(rowIndex);
  };

  const handleRowSumLeave = () => {
    setHoveredRowIndex(null);
  };

  const handleRemoveRow = (rowIndex: number) => {
    setMatrix((prev) => prev.filter((_, index) => index !== rowIndex));
  };

  const handleAddRow = () => {
    setMatrix((prev) => {
      if (prev.length === 0) return prev;

      const newRow: Cell[] = prev[0].map(() => ({
        id: Date.now() + Math.random(),
        amount: Math.floor(Math.random() * 900) + 100,
      }));

      return [...prev, newRow];
    });
  };

  return (
    <MatrixContext.Provider
      value={{
        rows,
        cols,
        x,
        matrix,
        highlightedIds,
        hoveredRowIndex,
        setRows,
        setCols,
        setX,
        generate,
        handleCellClick,
        handleCellHover,
        handleCellLeave,
        handleRowSumHover,
        handleRowSumLeave,
        handleRemoveRow,
        handleAddRow,
      }}
    >
      {children}
    </MatrixContext.Provider>
  );
};

export const useMatrix = () => {
  const context = useContext(MatrixContext);
  if (!context) {
    throw new Error('useMatrix must be used within MatrixProvider');
  }
  return context;
};
