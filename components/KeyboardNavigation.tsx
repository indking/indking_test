import { useEffect } from 'react';
import { useSudokuStore } from '../store/sudokuStore';

export const KeyboardNavigation = () => {
  const { selectedCell, selectCell, updateCell } = useSudokuStore();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedCell) return;

      const { row, col } = selectedCell;

      // Arrow key navigation
      if (e.key === 'ArrowUp' && row > 0) {
        selectCell(row - 1, col);
      } else if (e.key === 'ArrowDown' && row < 8) {
        selectCell(row + 1, col);
      } else if (e.key === 'ArrowLeft' && col > 0) {
        selectCell(row, col - 1);
      } else if (e.key === 'ArrowRight' && col < 8) {
        selectCell(row, col + 1);
      }

      // Number input (1-9)
      if (/^[1-9]$/.test(e.key)) {
        updateCell(row, col, parseInt(e.key));
      }

      // Clear cell with Delete or Backspace
      if (e.key === 'Delete' || e.key === 'Backspace') {
        updateCell(row, col, 0);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedCell, selectCell, updateCell]);

  // This component doesn't render anything visible
  return null;
};

export default KeyboardNavigation; 