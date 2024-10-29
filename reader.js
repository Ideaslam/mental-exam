// reader.js

const fs = require('fs');
const csv = require('csv-parser');

function readExamData(filePath) {
  return new Promise((resolve, reject) => {
    const results = [];
    const students = [];

    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', () => {
        const dataRows = results.slice(0);

        dataRows.forEach((row, index) => {
          const name = row['الاسم'] || `Student ${index + 4}`;
          const answers = [];

          for (let q = 1; q <= 23; q++) {
            const questionKey = `Question ${q}`;
            answers.push(row[questionKey]);
          }

          students.push({ name, answers });
        });

        resolve(students);
      })
      .on('error', (err) => {
        reject(err);
      });
  });
}

module.exports = { readExamData };
