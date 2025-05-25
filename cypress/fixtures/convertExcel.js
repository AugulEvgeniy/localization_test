const XLSX = require('xlsx');
const fs = require('fs');

// Load the workbook
const workbook = XLSX.readFile('cypress/fixtures/GoldenGoals_Translations.xlsx'); // Insert the needed file name 
const sheetName = workbook.SheetNames[0];
const sheet = workbook.Sheets[sheetName];

// Convert to array of arrays (raw rows)
const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });

// Extract headers (first row)
const headers = data[0];

// Convert the rest of the rows to objects
const translations = data.slice(1).map((row, index) => {
  const rowObj = {};
  headers.forEach((header, i) => {
    if (header) {
      rowObj[header] = row[i];
    }
  });
  return rowObj;
});

// Save the entire dataset to JSON
fs.writeFileSync('full_translations.json', JSON.stringify(translations, null, 2), 'utf-8');
console.log('✅ All rows successfully written to full_translations.json');