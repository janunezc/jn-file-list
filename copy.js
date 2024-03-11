#!/usr/bin/env node

const csv = require('csv-parser');
const fs = require('fs-extra');
const path = require('path');

const [,, csvFilePath, maxAgeDays, targetPath] = process.argv;

if (!csvFilePath || !maxAgeDays || !targetPath) {
  console.log('Usage: node copy.js <path-to-file-list.csv> <max-age-days> <target-path>');
  process.exit(1);
}

async function copyFiles(csvFilePath, maxAgeDays, targetPath) {
  const maxAgeDate = new Date();
  maxAgeDate.setDate(maxAgeDate.getDate() - maxAgeDays);

  fs.createReadStream(csvFilePath)
    .pipe(csv())
    .on('data', (row) => {
      const { PATH: filePath, 'LAST ACCESS DATE': accessDate } = row;
      const fileAccessDate = new Date(accessDate);

      if (fileAccessDate >= maxAgeDate) {
        const relativePath = path.relative(path.dirname(csvFilePath), filePath);
        const targetFilePath = path.join(targetPath, relativePath);

        fs.ensureDir(path.dirname(targetFilePath))
          .then(() => fs.copy(filePath, targetFilePath))
          .then(() => console.log(`Copied: ${filePath} -> ${targetFilePath}`))
          .catch(err => console.error(`Error copying file ${filePath}:`, err));
      }
    })
    .on('end', () => {
      console.log('Finished processing CSV.');
    });
}

copyFiles(csvFilePath, maxAgeDays, targetPath).catch(console.error);
