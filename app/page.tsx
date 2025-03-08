'use client';

import { useState, useEffect } from 'react';
import SudokuBoard from '@/components/SudokuBoard';
import NumberPad from '@/components/NumberPad';
import GameControls from '@/components/GameControls';
import Header from '@/components/Header';
import { useSudokuStore } from '@/store/sudokuStore';

export default function Home() {
  const [selectedCell, setSelectedCell] = useState<[number, number] | null>(null);
  const [isClient, setIsClient] = useState(false);
  const { 
    board, 
    prefilled, 
    difficulty, 
    setDifficulty, 
    newGame, 
    validateBoard, 
    isComplete, 
    isValid 
  } = useSudokuStore();

  // This effect runs once on component mount to indicate we're on the client
  useEffect(() => {
    setIsClient(true);
    // Initialize a new game when the component mounts on the client
    newGame();
  }, [newGame]);

  const handleCellClick = (row: number, col: number) => {
    if (!prefilled[row][col]) {
      setSelectedCell([row, col]);
    }
  };

  const handleNumberClick = (num: number) => {
    if (selectedCell) {
      const [row, col] = selectedCell;
      useSudokuStore.getState().setCell(row, col, num);
    }
  };

  const handleEraseClick = () => {
    if (selectedCell) {
      const [row, col] = selectedCell;
      useSudokuStore.getState().setCell(row, col, 0);
    }
  };

  const handleValidateClick = () => {
    validateBoard();
  };

  const handleNewGameClick = () => {
    newGame();
    setSelectedCell(null);
  };

  const handleDifficultyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDifficulty(e.target.value as 'easy' | 'medium' | 'hard');
    newGame();
    setSelectedCell(null);
  };

  // Show a loading state until client-side code is running
  if (!isClient) {
    return (
      <div className="max-w-4xl mx-auto">
        <Header />
        <div className="mt-8 flex items-center justify-center h-[500px]">
          <div className="animate-pulse text-lg text-gray-600">Loading Sudoku game...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Header />
      
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <SudokuBoard 
            board={board} 
            prefilled={prefilled} 
            selectedCell={selectedCell} 
            onCellClick={handleCellClick} 
          />
        </div>
        
        <div className="flex flex-col justify-between">
          <div>
            <GameControls 
              difficulty={difficulty} 
              onDifficultyChange={handleDifficultyChange}
              onNewGameClick={handleNewGameClick}
              onValidateClick={handleValidateClick}
            />
            
            {isComplete !== null && (
              <div className={`validation-message ${isValid ? 'success' : 'error'}`}>
                {isValid 
                  ? 'Congratulations! You solved the puzzle correctly!' 
                  : 'There are some errors in your solution. Keep trying!'}
              </div>
            )}
          </div>
          
          <NumberPad 
            onNumberClick={handleNumberClick} 
            onEraseClick={handleEraseClick} 
          />
        </div>
      </div>
    </div>
  );
}