import { test } from '@playwright/test';

test.describe('Take Screenshots', () => {
  test('capture game board screenshot', async ({ page }) => {
    // Navigate to the app
    await page.goto('http://localhost:3000');
    
    // Wait for the game to load
    await page.waitForSelector('.sudoku-board', { state: 'visible' });
    
    // Take a screenshot of the game board
    await page.screenshot({ 
      path: './public/screenshots/game-screenshot.png',
      fullPage: false 
    });
  });

  test('capture mobile view screenshot', async ({ page }) => {
    // Set viewport to mobile size
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Navigate to the app
    await page.goto('http://localhost:3000');
    
    // Wait for the game to load
    await page.waitForSelector('.sudoku-board', { state: 'visible' });
    
    // Take a screenshot of the mobile view
    await page.screenshot({ 
      path: './public/screenshots/mobile-view.png',
      fullPage: true 
    });
  });

  test('capture difficulty levels screenshot', async ({ page }) => {
    // Navigate to the app
    await page.goto('http://localhost:3000');
    
    // Wait for the game to load
    await page.waitForSelector('.difficulty-selector', { state: 'visible' });
    
    // Click on the difficulty selector to show options
    await page.click('.difficulty-selector');
    
    // Take a screenshot focusing on the difficulty selector
    await page.screenshot({ 
      path: './public/screenshots/difficulty-levels.png',
      fullPage: false 
    });
  });
}); 