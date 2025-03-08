import { useEffect, useState } from 'react';
import { useSudokuStore } from '../store/sudokuStore';

export const SoundEffects = () => {
  const [isMuted, setIsMuted] = useState(false);
  const { board, isComplete, isValid } = useSudokuStore();
  
  // Load mute preference from localStorage
  useEffect(() => {
    const savedMute = localStorage.getItem('sudokuMuted');
    if (savedMute) {
      setIsMuted(savedMute === 'true');
    }
  }, []);
  
  // Save mute preference to localStorage
  const toggleMute = () => {
    const newMuted = !isMuted;
    setIsMuted(newMuted);
    localStorage.setItem('sudokuMuted', newMuted.toString());
  };
  
  // Play sound when a cell is filled
  useEffect(() => {
    if (isMuted) return;
    
    // We can't directly listen to cell changes, so we'll use a timeout
    // to avoid playing sounds during initial board setup
    const timer = setTimeout(() => {
      const audio = new Audio('/sounds/click.mp3');
      audio.volume = 0.3;
      audio.play().catch(e => console.log('Audio play failed:', e));
    }, 100);
    
    return () => clearTimeout(timer);
  }, [board, isMuted]);
  
  // Play sound when the game is completed
  useEffect(() => {
    if (isMuted || !isComplete) return;
    
    const audio = new Audio(isValid ? '/sounds/success.mp3' : '/sounds/error.mp3');
    audio.volume = 0.5;
    audio.play().catch(e => console.log('Audio play failed:', e));
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