// main.js

const { readExamData } = require('./reader');
const { processStudentData } = require('./processor');
const { calculateRatios } = require('./ratio');
const { generateGraph } = require('./graph');
const { writePairsToCSV } = require('./writer');
const { clusterData } = require('./cluster');

async function main() {
  try {
    const students = await readExamData('exam.csv');
    const pairs = processStudentData(students);
    const ratioData = calculateRatios(pairs);
    generateGraph(ratioData, 'ratio_graph.png');
    clusterData(pairs);
    writePairsToCSV(pairs, 'pairs.csv');
  } catch (err) {
    console.error('Error:', err);
  }
}

main();
