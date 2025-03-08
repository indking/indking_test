import { motion } from 'framer-motion';

interface GameControlsProps {
  difficulty: string;
  onDifficultyChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onNewGameClick: () => void;
  onValidateClick: () => void;
}

export default function GameControls({ 
  difficulty, 
  onDifficultyChange, 
  onNewGameClick, 
  onValidateClick 
}: GameControlsProps) {
  const containerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <motion.div
      className="mb-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div className="mb-4" variants={itemVariants}>
        <label htmlFor="difficulty" className="block text-sm font-medium text-gray-700 mb-1">
          Difficulty
        </label>
        <select
          id="difficulty"
          value={difficulty}
          onChange={onDifficultyChange}
          className="difficulty-selector w-full"
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </motion.div>

      <div className="grid grid-cols-2 gap-3">
        <motion.button
          className="action-button primary"
          onClick={onNewGameClick}
          variants={itemVariants}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          New Game
        </motion.button>

        <motion.button
          className="action-button success validate-button"
          onClick={onValidateClick}
          variants={itemVariants}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          Validate
        </motion.button>
      </div>

      <motion.div 
        className="mt-4 p-3 bg-blue-50 rounded-lg text-sm text-blue-800"
        variants={itemVariants}
      >
        <p className="font-medium">How to play:</p>
        <ol className="list-decimal pl-5 mt-1 space-y-1">
          <li>Fill each empty cell with a number from 1-9</li>
          <li>Each row, column, and 3x3 box must contain all numbers 1-9 without repetition</li>
          <li>Use the number pad to input numbers</li>
          <li>Click "Validate" to check your solution</li>
        </ol>
      </motion.div>
    </motion.div>
  );
}