import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface CellPosition {
  row: number;
  col: number;
}

interface SudokuBoardProps {
  board: number[][];
  prefilled: boolean[][];
  selectedCell: CellPosition | null;
  onCellClick: (row: number, col: number) => void;
}

export default function SudokuBoard({ board, prefilled, selectedCell, onCellClick }: SudokuBoardProps) {
  // Animation variants for the board
  const boardVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.01,
      }
    }
  };

  // Animation variants for each cell
  const cellVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 }
  };

  // Check if a cell is in the same row, column, or 3x3 box as the selected cell
  const isRelatedToSelected = (row: number, col: number) => {
    if (!selectedCell) return false;
    
    // Same row
    if (row === selectedCell.row) return true;
    
    // Same column
    if (col === selectedCell.col) return true;
    
    // Same 3x3 box
    const boxRow = Math.floor(row / 3);
    const boxCol = Math.floor(col / 3);
    const selectedBoxRow = Math.floor(selectedCell.row / 3);
    const selectedBoxCol = Math.floor(selectedCell.col / 3);
    
    return boxRow === selectedBoxRow && boxCol === selectedBoxCol;
  };

  // Check if a cell has the same value as the selected cell
  const hasSameValueAsSelected = (row: number, col: number) => {
    if (!selectedCell) return false;
    
    const selectedValue = board[selectedCell.row][selectedCell.col];
    
    return selectedValue !== 0 && board[row][col] === selectedValue;
  };

  // Get the 3x3 block identifier for checkerboard pattern
  const getBlockClass = (row: number, col: number) => {
    const blockRow = Math.floor(row / 3);
    const blockCol = Math.floor(col / 3);
    return `block-${blockRow}-${blockCol}`;
  };

  return (
    <motion.div 
      className="sudoku-board"
      variants={boardVariants}
      initial="hidden"
      animate="visible"
    >
      {board.map((row, rowIndex) => (
        row.map((cell, colIndex) => {
          // Determine if this cell should have a thicker border
          const isRightBorder = (colIndex + 1) % 3 === 0 && colIndex < 8;
          const isBottomBorder = (rowIndex + 1) % 3 === 0 && rowIndex < 8;
          
          return (
            <motion.div
              key={`${rowIndex}-${colIndex}`}
              className={cn(
                'sudoku-cell',
                getBlockClass(rowIndex, colIndex),
                prefilled[rowIndex][colIndex] && 'prefilled',
                selectedCell && selectedCell.row === rowIndex && selectedCell.col === colIndex && 'selected',
                !prefilled[rowIndex][colIndex] && isRelatedToSelected(rowIndex, colIndex) && 'highlight',
                !prefilled[rowIndex][colIndex] && hasSameValueAsSelected(rowIndex, colIndex) && 'highlight',
                isRightBorder && 'right-border',
                isBottomBorder && 'bottom-border'
              )}
              onClick={() => onCellClick(rowIndex, colIndex)}
              variants={cellVariants}
            >
              {cell !== 0 ? cell : ''}
            </motion.div>
          );
        })
      ))}
    </motion.div>
  );
}