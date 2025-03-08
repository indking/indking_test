import { useState } from 'react';
import { useSudokuStore } from '../store/sudokuStore';

export const HintSystem = () => {
  const [hintsUsed, setHintsUsed] = useState(0);
  const { board, solution, selectedCell, updateCell } = useSudokuStore();
  
  const getHint = () => {
    if (!selectedCell) {
      alert('Please select a cell first');
      return;
    }
    
    const { row, col } = selectedCell;
    
    // If the cell is already filled correctly, notify the user
    if (board[row][col] === solution[row][col]) {
      alert('This cell is already correct!');
      return;
    }
    
    // Fill in the correct value from the solution
    updateCell(row, col, solution[row][col]);
    setHintsUsed(hintsUsed + 1);
  };
  
  return (
    <div className="flex flex-col items-center mb-4">
      <button 
        onClick={getHint}
        className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-colors duration-200 flex items-center"
      >
        <span className="mr-2">🔍</span>
        Get Hint
      </button>
      <div className="text-sm text-gray-600 mt-1">
        Hints used: {hintsUsed}
      </div>
    </div>
  );
};

export default HintSystem; 