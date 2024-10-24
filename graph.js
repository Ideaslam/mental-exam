// graph.js

const { createCanvas } = require('canvas');
const fs = require('fs');

function generateGraph(ratioData, outputFile) {
  const { ratio, totalPairs } = ratioData;
  const width = 1200;
  const height = 600;
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  // Set background color
  ctx.fillStyle = '#fff';
  ctx.fillRect(0, 0, width, height);

  // Set text properties
  ctx.fillStyle = '#000';
  ctx.font = '20px Arial';

  // Calculate the maximum value for scaling
  const maxPairs = Math.max(...Object.values(ratio));

  // Draw the bars
  const barWidth = 50;
  const barSpacing = 20;
  let x = 50;
  for (let count in ratio) {
    const barHeight = (ratio[count] / maxPairs) * (height - 100);
    ctx.fillStyle = '#3498db';
    ctx.fillRect(x, height - barHeight - 50, barWidth, barHeight);

    // Draw the labels
    ctx.fillStyle = '#000';
    ctx.fillText(
      `${count} (${((ratio[count] / totalPairs) * 100).toFixed(2)}%)`,
      x,
      height - 20
    );
    x += barWidth + barSpacing;
  }

  // Save the canvas to a file
  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(outputFile, buffer);
  console.log(`Graph has been saved to ${outputFile}`);
}

module.exports = { generateGraph };
