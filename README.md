# Sudoku Game

A modern Sudoku game with a clean, Perplexity-inspired design and Playwright testing.

![Sudoku Game Screenshot](/public/screenshots/desktop-view.png)

## Features

- 🎮 Interactive Sudoku game with three difficulty levels (Easy, Medium, Hard)
- 🎨 Clean, modern UI inspired by Perplexity's design aesthetic
- 🔄 Generate new puzzles with varying difficulty
- ✅ Validate your solution with instant feedback
- 📱 Responsive design for desktop and mobile
- 🧪 Comprehensive test suite using Playwright
- 🎯 Intelligent puzzle generation algorithm
- 🌓 Visual separation of 3x3 blocks for better readability
- 🔢 Number pad for easy input on both desktop and mobile

## Implemented Features

- ⏱️ Game timer to track solving speed
- 🏆 Score tracking and leaderboards
- 💾 Save game progress
- 🎵 Sound effects and background music
- 🌙 Dark mode support
- 🔍 Hint system for when you're stuck
- 🎮 Keyboard navigation support
- 🎯 Daily challenges with unique puzzles

## Screenshots

### Desktop View
![Desktop View](/public/screenshots/desktop-view.png)

### Mobile View
![Mobile View](/public/screenshots/mobile-view.png)

**Taking Screenshots:**
1. Make sure the development server is running: `npm run dev`
2. Install Playwright browsers if you haven't already: `npx playwright install`
3. Run the screenshot script: `npx playwright test tests/take-screenshots.spec.ts`
4. Screenshots will be saved to the `/public/screenshots/` directory
5. Commit and push the screenshots to update the README on GitHub

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Animations**: Framer Motion
- **Testing**: Playwright

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/indking/indking_test.git
cd indking_test
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Run the development server:

```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Game Rules

1. Fill each empty cell with a number from 1-9
2. Each row must contain all numbers from 1-9 without repetition
3. Each column must contain all numbers from 1-9 without repetition
4. Each 3x3 box must contain all numbers from 1-9 without repetition

## Testing

This project uses Playwright for end-to-end testing. To run the tests:

```bash
# Install Playwright browsers (first time only)
npx playwright install

# Run the tests
npm test

# Run tests with UI
npm run test:ui
```

## Project Structure

```
indking_test/
├── app/                  # Next.js app directory
│   ├── globals.css       # Global styles
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Home page
├── components/           # React components
│   ├── GameControls.tsx  # Game controls component
│   ├── Header.tsx        # Header component
│   ├── NumberPad.tsx     # Number pad component
│   └── SudokuBoard.tsx   # Sudoku board component
├── lib/                  # Utility functions
│   └── utils.ts          # Utility functions
├── public/               # Static files
│   └── screenshots/      # Game screenshots
├── store/                # State management
│   └── sudokuStore.ts    # Sudoku game state
├── tests/                # Playwright tests
│   ├── sudoku.spec.ts    # Sudoku game tests
│   └── take-screenshots.spec.ts # Screenshot script
├── next.config.js        # Next.js configuration
├── package.json          # Project dependencies
├── postcss.config.js     # PostCSS configuration
├── tailwind.config.js    # Tailwind CSS configuration
└── tsconfig.json         # TypeScript configuration
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- Inspired by the clean design of [Perplexity](https://www.perplexity.ai/)
- Built with [Next.js](https://nextjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Tested with [Playwright](https://playwright.dev/)