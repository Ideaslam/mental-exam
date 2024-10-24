// writer.js

const csvWriter = require('csv-writer').createObjectCsvWriter;

function writePairsToCSV(pairs, outputFile) {
  const writer = csvWriter({
    path: outputFile,
    header: [
      { id: 'studentA', title: 'Student A' },
      { id: 'studentB', title: 'Student B' },
      { id: 'sameAnswersCount', title: 'Identical Answers' },
    ],
  });

  writer
    .writeRecords(pairs)
    .then(() => {
      console.log(`Pairs have been written to ${outputFile}`);
    })
    .catch((err) => {
      console.error('Error writing to CSV file', err);
    });
}

module.exports = { writePairsToCSV };
