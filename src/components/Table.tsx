import { getPercentile60 } from '../utils/getPercentile60';
import type { Cell } from '../types/cell';
import { useMatrix } from '../context/MatrixContext';

export const Table = () => {
  const {
    matrix,
    highlightedIds,
    hoveredRowIndex,
    handleCellClick,
    handleCellHover,
    handleCellLeave,
    handleRowSumHover,
    handleRowSumLeave,
    handleRemoveRow,
  } = useMatrix();

  if (matrix.length === 0) {
    return null;
  }

  return (
    <table>
      <tbody>
        {matrix.map((row: Cell[], rowIndex) => {
          const rowSum = row.reduce((sum, cell) => sum + cell.amount, 0);
          const maxInRow = Math.max(...row.map((cell) => cell.amount));

          return (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td
                  key={cell.id}
                  className={`table-cell ${
                    hoveredRowIndex === rowIndex ? 'heatmap' : ''
                  } ${highlightedIds.includes(cell.id) ? 'highlight' : ''}`}
                  onClick={() => handleCellClick(rowIndex, cellIndex)}
                  onMouseEnter={() => handleCellHover(cell)}
                  onMouseLeave={handleCellLeave}
                  style={
                    hoveredRowIndex === rowIndex
                      ? ({
                          '--heat': (cell.amount / maxInRow).toString(),
                        } as React.CSSProperties)
                      : undefined
                  }
                >
                  {hoveredRowIndex === rowIndex
                    ? `${((cell.amount / rowSum) * 100).toFixed(0)}%`
                    : cell.amount}
                </td>
              ))}

              <td
                className='row-sum'
                onMouseEnter={() => handleRowSumHover(rowIndex)}
                onMouseLeave={() => handleRowSumLeave()}
              >
                {rowSum}
              </td>

              <td className='row-remove'>
                <button
                  className='remove-btn'
                  onClick={() => handleRemoveRow(rowIndex)}
                >
                  ✖
                </button>
              </td>
            </tr>
          );
        })}

        <tr className='percentile-row'>
          {matrix[0].map((_, colIndex) => {
            const columnValues = matrix.map((row) => row[colIndex].amount);
            const percentile60 = getPercentile60(columnValues);

            return <td key={colIndex}>{percentile60.toFixed(1)}</td>;
          })}

          {/* <td className='row-sum'>60%</td> */}
        </tr>
      </tbody>
    </table>
  );
};
