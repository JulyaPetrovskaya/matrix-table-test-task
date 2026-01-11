import { useMatrix } from '../context/MatrixContext';

export const Controls = () => {
  const { rows, cols, x, setRows, setCols, setX, generate } = useMatrix();

  return (
    <div className='controls'>
      <label>
        Rows (M):
        <input
          type='number'
          min={0}
          max={100}
          value={rows === 0 ? '' : rows}
          placeholder='0'
          onChange={(e) => {
            const value = Math.min(100, Math.max(0, Number(e.target.value)));
            setRows(value);
          }}
        />
      </label>

      <label>
        Columns (N):
        <input
          type='number'
          min={0}
          max={100}
          value={cols === 0 ? '' : cols}
          placeholder='0'
          onChange={(e) => {
            const value = Math.min(100, Math.max(0, Number(e.target.value)));
            setCols(value);
          }}
        />
      </label>

      <label>
        X (nearest cells):
        <input
          type='number'
          min={0}
          max={rows * cols - 1}
          value={x === 0 ? '' : x}
          placeholder='0'
          onChange={(e) => {
            const maxX = Math.max(0, rows * cols - 1);
            const value = Math.min(maxX, Math.max(0, Number(e.target.value)));
            setX(value);
          }}
        />
      </label>

      <button onClick={generate}>Generate Matrix</button>
    </div>
  );
};
