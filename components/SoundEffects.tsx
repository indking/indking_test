import { useEffect, useState, useRef } from 'react';
import { useSudokuStore } from '../store/sudokuStore';

export const SoundEffects = () => {
  const [isMuted, setIsMuted] = useState(false);
  const { board, isComplete, isValid } = useSudokuStore();
  const prevBoardRef = useRef<number[][]>(board);
  
  // Load mute preference from localStorage
  useEffect(() => {
    // Only run on client side
    if (typeof window !== 'undefined') {
      const savedMute = localStorage.getItem('sudokuMuted');
      if (savedMute) {
        setIsMuted(savedMute === 'true');
      }
    }
  }, []);
  
  // Save mute preference to localStorage
  const toggleMute = () => {
    const newMuted = !isMuted;
    setIsMuted(newMuted);
    if (typeof window !== 'undefined') {
      localStorage.setItem('sudokuMuted', newMuted.toString());
    }
    
    // Play a test sound when unmuting
    if (!newMuted) {
      playSound('/sounds/click.mp3', 0.2);
    }
  };
  
  // Helper function to play sounds
  const playSound = (soundPath: string, volume: number = 0.3) => {
    if (isMuted || typeof window === 'undefined') return;
    
    try {
      const audio = new Audio(soundPath);
      audio.volume = volume;
      audio.play().catch(e => {
        console.log('Audio play failed:', e);
      });
    } catch (error) {
      console.error('Error playing sound:', error);
    }
  };
  
  // Play sound when a cell is filled
  useEffect(() => {
    if (isMuted || typeof window === 'undefined') return;
    
    // Compare current board with previous board to detect changes
    const hasChanged = board.some((row, rowIndex) => 
      row.some((cell, colIndex) => cell !== prevBoardRef.current[rowIndex][colIndex])
    );
    
    if (hasChanged) {
      playSound('/sounds/click.mp3');
    }
    
    // Update the previous board reference
    prevBoardRef.current = board.map(row => [...row]);
  }, [board, isMuted]);
  
  // Play sound when the game is completed
  useEffect(() => {
    if (isMuted || typeof window === 'undefined' || !isComplete) return;
    
    playSound(isValid ? '/sounds/success.mp3' : '/sounds/error.mp3', 0.5);
  }, [isComplete, isValid, isMuted]);
  
  return (
    <button
      onClick={toggleMute}
      className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
      aria-label={isMuted ? 'Unmute sounds' : 'Mute sounds'}
    >
      {isMuted ? (
        <span className="text-xl">🔇</span>
      ) : (
        <span className="text-xl">🔊</span>
      )}
    </button>
  );
};

export default SoundEffects; 