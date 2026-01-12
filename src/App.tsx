import './styles/base.css';
import { Controls } from './components/Controls';
import { Table } from './components/Table';
import { useMatrix } from './context/useMatrix';

function App() {
  const { matrix, handleAddRow } = useMatrix();

  return (
    <div className='app'>
      <h1 className='title'>Matrix Table</h1>

      <Controls />

      {matrix.length > 0 && (
        <>
          <p className='info'>
            Matrix size: {matrix.length} × {matrix[0]?.length || 0}
          </p>

          <div className='table-wrapper'>
            <Table />
          </div>

          <button className='add-row-btn' onClick={handleAddRow}>
            ➕ Add row
          </button>
        </>
      )}
    </div>
  );
}

export default App;
