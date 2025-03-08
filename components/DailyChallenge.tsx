import { useState, useEffect } from 'react';
import { useSudokuStore } from '../store/sudokuStore';

export const DailyChallenge = () => {
  const [isAvailable, setIsAvailable] = useState(false);
  const [timeUntilNext, setTimeUntilNext] = useState('');
  const { newGame, setDifficulty } = useSudokuStore();
  
  // Check if daily challenge is available
  useEffect(() => {
    const lastPlayed = localStorage.getItem('sudokuDailyChallenge');
    const today = new Date().toDateString();
    
    if (lastPlayed !== today) {
      setIsAvailable(true);
    } else {
      setIsAvailable(false);
      updateTimeUntilNext();
    }
  }, []);
  
  // Update countdown timer
  const updateTimeUntilNext = () => {
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    
    const timeLeft = tomorrow.getTime() - now.getTime();
    const hours = Math.floor(timeLeft / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    
    setTimeUntilNext(`${hours}h ${minutes}m`);
  };
  
  // Start countdown timer
  useEffect(() => {
    if (isAvailable) return;
    
    const interval = setInterval(updateTimeUntilNext, 60000); // Update every minute
    return () => clearInterval(interval);
  }, [isAvailable]);
  
  // Start daily challenge
  const startDailyChallenge = () => {
    if (!isAvailable) return;
    
    // Use the current date as seed for the daily challenge
    const today = new Date().toDateString();
    const seed = hashString(today);
    
    // Set a random difficulty based on the day of the week
    const dayOfWeek = new Date().getDay();
    const difficulties = ['easy', 'medium', 'hard'];
    const difficulty = difficulties[dayOfWeek % 3];
    
    setDifficulty(difficulty as any);
    
    // Mark as played
    localStorage.setItem('sudokuDailyChallenge', today);
    setIsAvailable(false);
    updateTimeUntilNext();
    
    // Generate new game (the seed would ideally be used here)
    newGame();
  };
  
  // Simple hash function for string
  const hashString = (str: string): number => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash);
  };
  
  return (
    <div className="mb-4">
      {isAvailable ? (
        <button
          onClick={startDailyChallenge}
          className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-colors duration-200 flex items-center"
        >
          <span className="mr-2">🎯</span>
          Play Daily Challenge
        </button>
      ) : (
        <div className="bg-gray-200 dark:bg-gray-700 p-3 rounded-lg text-center">
          <p className="text-sm">Next daily challenge in:</p>
          <p className="font-mono font-bold">{timeUntilNext}</p>
        </div>
      )}
    </div>
  );
};

export default DailyChallenge; 