import { motion } from 'framer-motion';

export default function Header() {
  return (
    <motion.div 
      className="text-center"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h1 
        className="text-3xl md:text-4xl font-bold text-gray-900"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        Sudoku Game
      </motion.h1>
      <motion.p 
        className="mt-2 text-gray-600 max-w-2xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        A modern Sudoku game with a clean, Perplexity-inspired design. Challenge yourself with different difficulty levels!
      </motion.p>
    </motion.div>
  );
}