const fs = require('fs');
const wordListPath = require('word-list').default;

// Read all words from the word-list package
const fullWordList = fs.readFileSync(wordListPath, 'utf8');

// Optionally limit to the first 100,000 for performance
const limitedList = fullWordList.split('\n').slice(0, 100000).join('\n');

// Save to Cypress fixture
fs.writeFileSync('cypress/fixtures/word-list.txt', limitedList);

console.log('✅ word-list.txt created with', limitedList.split('\n').length, 'words');