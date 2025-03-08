import { useState } from 'react';
import { useSudokuStore } from '../store/sudokuStore';

export const SaveLoadGame = () => {
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);
  const { saveGame, loadGame } = useSudokuStore();

  const handleSave = () => {
    try {
      saveGame();
      setMessage({ text: 'Game saved successfully!', type: 'success' });
    } catch (error) {
      setMessage({ text: 'Failed to save game.', type: 'error' });
    }
    
    // Clear message after 3 seconds
    setTimeout(() => setMessage(null), 3000);
  };

  const handleLoad = () => {
    const success = loadGame();
    if (success) {
      setMessage({ text: 'Game loaded successfully!', type: 'success' });
    } else {
      setMessage({ text: 'No saved game found.', type: 'error' });
    }
    
    // Clear message after 3 seconds
    setTimeout(() => setMessage(null), 3000);
  };

  return (
    <div className="flex flex-col items-center mb-4">
      <div className="flex space-x-2">
        <button
          onClick={handleSave}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-colors duration-200 flex items-center"
        >
          <span className="mr-2">💾</span>
          Save
        </button>
        <button
          onClick={handleLoad}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-colors duration-200 flex items-center"
        >
          <span className="mr-2">📂</span>
          Load
        </button>
      </div>
      
      {message && (
        <div 
          className={`mt-2 px-4 py-2 rounded-lg text-white ${
            message.type === 'success' ? 'bg-green-500' : 'bg-red-500'
          }`}
        >
          {message.text}
        </div>
      )}
    </div>
  );
};

export default SaveLoadGame; 