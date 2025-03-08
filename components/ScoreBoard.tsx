import { useState, useEffect } from 'react';
import { useSudokuStore } from '../store/sudokuStore';

interface LeaderboardEntry {
  name: string;
  score: number;
  date: string;
}

export const ScoreBoard = () => {
  const { score } = useSudokuStore();
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [playerName, setPlayerName] = useState('');
  const [showNameInput, setShowNameInput] = useState(false);

  // Load leaderboard from localStorage
  useEffect(() => {
    const savedLeaderboard = localStorage.getItem('sudokuLeaderboard');
    if (savedLeaderboard) {
      setLeaderboard(JSON.parse(savedLeaderboard));
    }
  }, []);

  const toggleLeaderboard = () => {
    setShowLeaderboard(!showLeaderboard);
  };

  const saveScore = () => {
    if (!playerName.trim()) return;

    const newEntry: LeaderboardEntry = {
      name: playerName,
      score,
      date: new Date().toLocaleDateString()
    };

    const updatedLeaderboard = [...leaderboard, newEntry]
      .sort((a, b) => b.score - a.score)
      .slice(0, 10); // Keep only top 10 scores

    setLeaderboard(updatedLeaderboard);
    localStorage.setItem('sudokuLeaderboard', JSON.stringify(updatedLeaderboard));
    setShowNameInput(false);
    setPlayerName('');
  };

  return (
    <div className="mb-4 w-full max-w-md">
      <div className="flex justify-between items-center bg-blue-100 dark:bg-blue-900 p-3 rounded-lg shadow-md">
        <div className="flex items-center">
          <span className="text-xl font-bold mr-2">🏆</span>
          <span className="font-bold">Score:</span>
          <span className="ml-2 text-xl font-mono">{score}</span>
        </div>
        <button
          onClick={toggleLeaderboard}
          className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md transition-colors duration-200"
        >
          {showLeaderboard ? 'Hide' : 'Leaderboard'}
        </button>
      </div>

      {showLeaderboard && (
        <div className="mt-2 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-bold mb-2">Leaderboard</h3>
          
          {leaderboard.length > 0 ? (
            <div className="overflow-y-auto max-h-60">
              <table className="w-full">
                <thead>
                  <tr className="border-b dark:border-gray-700">
                    <th className="text-left py-2">Rank</th>
                    <th className="text-left py-2">Name</th>
                    <th className="text-right py-2">Score</th>
                    <th className="text-right py-2">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {leaderboard.map((entry, index) => (
                    <tr key={index} className="border-b dark:border-gray-700">
                      <td className="py-2">{index + 1}</td>
                      <td className="py-2">{entry.name}</td>
                      <td className="text-right py-2">{entry.score}</td>
                      <td className="text-right py-2">{entry.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-500 dark:text-gray-400">No scores yet. Be the first!</p>
          )}
          
          <div className="mt-4">
            {showNameInput ? (
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value)}
                  placeholder="Enter your name"
                  className="flex-1 px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                  maxLength={15}
                />
                <button
                  onClick={saveScore}
                  className="bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-md transition-colors duration-200"
                >
                  Save
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowNameInput(true)}
                className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-md transition-colors duration-200"
              >
                Add Your Score
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ScoreBoard; 