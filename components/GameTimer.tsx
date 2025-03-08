import { useEffect, useState } from 'react';
import { useSudokuStore } from '../store/sudokuStore';

export const GameTimer = () => {
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const { isComplete } = useSudokuStore();

  // Start timer when component mounts
  useEffect(() => {
    setIsActive(true);
    return () => setIsActive(false);
  }, []);

  // Stop timer when puzzle is complete
  useEffect(() => {
    if (isComplete) {
      setIsActive(false);
    }
  }, [isComplete]);

  // Timer logic
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    
    if (isActive) {
      interval = setInterval(() => {
        setSeconds(seconds => seconds + 1);
      }, 1000);
    } else if (interval) {
      clearInterval(interval);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive]);

  // Format time as MM:SS
  const formatTime = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex items-center justify-center bg-blue-100 rounded-lg p-2 mb-4 shadow-md">
      <div className="flex items-center">
        <span className="text-xl font-bold mr-2">⏱️</span>
        <span className="text-xl font-mono">{formatTime(seconds)}</span>
      </div>
    </div>
  );
};

export default GameTimer; 