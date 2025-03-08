import { create } from 'zustand';

type Difficulty = 'easy' | 'medium' | 'hard';

interface CellPosition {
  row: number;
  col: number;
}

interface SudokuState {
  board: number[][];
  solution: number[][];
  prefilled: boolean[][];
  difficulty: Difficulty;
  isComplete: boolean | null;
  isValid: boolean;
  selectedCell: CellPosition | null;
  score: number;
  
  setDifficulty: (difficulty: Difficulty) => void;
  setCell: (row: number, col: number, value: number) => void;
  updateCell: (row: number, col: number, value: number) => void;
  selectCell: (row: number, col: number) => void;
  newGame: () => void;
  validateBoard: () => void;
  saveGame: () => void;
  loadGame: () => boolean;
  updateScore: (points: number) => void;
}

// Helper function to create an empty 9x9 board
const createEmptyBoard = (): number[][] => {
  return Array(9).fill(0).map(() => Array(9).fill(0));
};

// Helper function to create an empty prefilled status board
const createEmptyPrefilled = (): boolean[][] => {
  return Array(9).fill(false).map(() => Array(9).fill(false));
};

// Helper function to check if a number can be placed at a position
const isValid = (board: number[][], row: number, col: number, num: number): boolean => {
  // Check row
  for (let x = 0; x < 9; x++) {
    if (board[row][x] === num) return false;
  }

  // Check column
  for (let y = 0; y < 9; y++) {
    if (board[y][col] === num) return false;
  }

  // Check 3x3 box
  const boxRow = Math.floor(row / 3) * 3;
  const boxCol = Math.floor(col / 3) * 3;
  for (let y = boxRow; y < boxRow + 3; y++) {
    for (let x = boxCol; x < boxCol + 3; x++) {
      if (board[y][x] === num) return false;
    }
  }

  return true;
};

// Helper function to solve a Sudoku board
const solveSudoku = (board: number[][]): boolean => {
  const boardCopy = board.map(row => [...row]);
  
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (boardCopy[row][col] === 0) {
        for (let num = 1; num <= 9; num++) {
          if (isValid(boardCopy, row, col, num)) {
            boardCopy[row][col] = num;
            
            if (solveSudoku(boardCopy)) {
              // Copy the solution back to the original board
              for (let r = 0; r < 9; r++) {
                for (let c = 0; c < 9; c++) {
                  board[r][c] = boardCopy[r][c];
                }
              }
              return true;
            }
            
            boardCopy[row][col] = 0;
          }
        }
        return false;
      }
    }
  }
  
  return true;
};

// Helper function to generate a Sudoku puzzle
const generateSudoku = (difficulty: Difficulty): { board: number[][], solution: number[][], prefilled: boolean[][] } => {
  const solution = createEmptyBoard();
  const prefilled = createEmptyPrefilled();
  
  // Fill the diagonal 3x3 boxes first (these can be filled independently)
  for (let box = 0; box < 3; box++) {
    const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    // Shuffle the numbers
    for (let i = nums.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [nums[i], nums[j]] = [nums[j], nums[i]];
    }
    
    let index = 0;
    for (let row = box * 3; row < box * 3 + 3; row++) {
      for (let col = box * 3; col < box * 3 + 3; col++) {
        solution[row][col] = nums[index++];
      }
    }
  }
  
  // Solve the rest of the puzzle
  solveSudoku(solution);
  
  // Create a copy of the solution
  const board = solution.map(row => [...row]);
  
  // Determine how many cells to remove based on difficulty
  let cellsToRemove;
  switch (difficulty) {
    case 'easy':
      cellsToRemove = 40; // Leave ~41 clues
      break;
    case 'medium':
      cellsToRemove = 50; // Leave ~31 clues
      break;
    case 'hard':
      cellsToRemove = 60; // Leave ~21 clues
      break;
    default:
      cellsToRemove = 45;
  }
  
  // Remove cells to create the puzzle
  let removed = 0;
  while (removed < cellsToRemove) {
    const row = Math.floor(Math.random() * 9);
    const col = Math.floor(Math.random() * 9);
    
    if (board[row][col] !== 0) {
      board[row][col] = 0;
      removed++;
    }
  }
  
  // Mark prefilled cells
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      prefilled[row][col] = board[row][col] !== 0;
    }
  }
  
  return { board, solution, prefilled };
};

// Create initial state with empty boards to avoid hydration issues
const initialState = {
  board: createEmptyBoard(),
  solution: createEmptyBoard(),
  prefilled: createEmptyPrefilled(),
  difficulty: 'medium' as Difficulty,
  isComplete: null,
  isValid: false,
  selectedCell: null,
  score: 0,
};

export const useSudokuStore = create<SudokuState>((set, get) => {
  return {
    ...initialState,
    
    setDifficulty: (difficulty) => {
      set({ difficulty });
    },
    
    setCell: (row, col, value) => {
      const newBoard = get().board.map(r => [...r]);
      newBoard[row][col] = value;
      set({ board: newBoard, isComplete: null });
    },
    
    updateCell: (row, col, value) => {
      const { board, prefilled } = get();
      
      // Don't update prefilled cells
      if (prefilled[row][col]) return;
      
      const newBoard = board.map(r => [...r]);
      newBoard[row][col] = value;
      set({ board: newBoard, isComplete: null });
    },
    
    selectCell: (row, col) => {
      set({ selectedCell: { row, col } });
    },
    
    newGame: () => {
      const { board, solution, prefilled } = generateSudoku(get().difficulty);
      set({ 
        board, 
        solution, 
        prefilled,
        isComplete: null,
        isValid: false,
        selectedCell: null,
        score: 0
      });
    },
    
    validateBoard: () => {
      const { board, solution } = get();
      
      // Check if the board is complete
      const isComplete = board.every(row => row.every(cell => cell !== 0));
      
      // Check if the solution is correct
      const isValid = isComplete && board.every((row, rowIndex) => 
        row.every((cell, colIndex) => cell === solution[rowIndex][colIndex])
      );
      
      // Update score if the solution is correct
      if (isValid) {
        const difficultyPoints = {
          'easy': 100,
          'medium': 200,
          'hard': 300
        };
        set({ score: get().score + difficultyPoints[get().difficulty] });
      }
      
      set({ isComplete, isValid });
    },
    
    saveGame: () => {
      const { board, solution, prefilled, difficulty, score } = get();
      const gameState = {
        board,
        solution,
        prefilled,
        difficulty,
        score,
        savedAt: new Date().toISOString()
      };
      
      try {
        localStorage.setItem('sudokuGameState', JSON.stringify(gameState));
        return true;
      } catch (error) {
        console.error('Failed to save game:', error);
        return false;
      }
    },
    
    loadGame: () => {
      try {
        const savedState = localStorage.getItem('sudokuGameState');
        if (!savedState) return false;
        
        const { board, solution, prefilled, difficulty, score } = JSON.parse(savedState);
        set({ board, solution, prefilled, difficulty, score, selectedCell: null, isComplete: null, isValid: false });
        return true;
      } catch (error) {
        console.error('Failed to load game:', error);
        return false;
      }
    },
    
    updateScore: (points) => {
      set({ score: get().score + points });
    }
  };
});