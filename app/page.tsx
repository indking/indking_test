'use client';

import { useState, useEffect } from 'react';
import SudokuBoard from '@/components/SudokuBoard';
import NumberPad from '@/components/NumberPad';
import GameControls from '@/components/GameControls';
import Header from '@/components/Header';
import GameTimer from '@/components/GameTimer';
import HintSystem from '@/components/HintSystem';
import DarkModeToggle from '@/components/DarkModeToggle';
import SaveLoadGame from '@/components/SaveLoadGame';
import KeyboardNavigation from '@/components/KeyboardNavigation';
import ScoreBoard from '@/components/ScoreBoard';
import SoundEffects from '@/components/SoundEffects';
import DailyChallenge from '@/components/DailyChallenge';
import { useSudokuStore } from '@/store/sudokuStore';

export default function Home() {
  const [isClient, setIsClient] = useState(false);
  const { 
    board, 
    prefilled, 
    difficulty, 
    setDifficulty, 
    newGame, 
    validateBoard, 
    isComplete, 
    isValid,
    selectedCell,
    selectCell
  } = useSudokuStore();

  // This effect runs once on component mount to indicate we're on the client
  useEffect(() => {
    setIsClient(true);
    // Initialize a new game when the component mounts on the client
    newGame();
  }, [newGame]);

  const handleCellClick = (row: number, col: number) => {
    if (!prefilled[row][col]) {
      selectCell(row, col);
    }
  };

  const handleNumberClick = (num: number) => {
    if (selectedCell) {
      const { row, col } = selectedCell;
      useSudokuStore.getState().updateCell(row, col, num);
    }
  };

  const handleEraseClick = () => {
    if (selectedCell) {
      const { row, col } = selectedCell;
      useSudokuStore.getState().updateCell(row, col, 0);
    }
  };

  const handleValidateClick = () => {
    validateBoard();
  };

  const handleNewGameClick = () => {
    newGame();
  };

  const handleDifficultyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDifficulty(e.target.value as 'easy' | 'medium' | 'hard');
    newGame();
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
    <div className="max-w-4xl mx-auto dark:bg-gray-900 dark:text-white min-h-screen p-4">
      <div className="flex justify-between items-center">
        <Header />
        <div className="flex space-x-2">
          <DarkModeToggle />
          <SoundEffects />
        </div>
      </div>
      
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <GameTimer />
          <SudokuBoard 
            board={board} 
            prefilled={prefilled} 
            selectedCell={selectedCell} 
            onCellClick={handleCellClick} 
          />
          <KeyboardNavigation />
        </div>
        
        <div className="flex flex-col justify-between">
          <div className="space-y-4">
            <ScoreBoard />
            
            <GameControls 
              difficulty={difficulty} 
              onDifficultyChange={handleDifficultyChange}
              onNewGameClick={handleNewGameClick}
              onValidateClick={handleValidateClick}
            />
            
            <DailyChallenge />
            
            <SaveLoadGame />
            
            <HintSystem />
            
            {isComplete !== null && (
              <div className={`p-4 rounded-lg ${isValid ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100' : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100'}`}>
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