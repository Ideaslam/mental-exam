const fs = require("fs");
const csv = require("csv-parser");
const csvWriter = require("csv-writer").createObjectCsvWriter;
const { createCanvas } = require("canvas");

const results = [];
const students = [];

fs.createReadStream("exam.csv")
  .pipe(csv())
  .on("data", (data) => results.push(data))
  .on("end", () => {
    // Skip the first three rows if they are headers or irrelevant
    const dataRows = results.slice(0);

    // Extract student names and their answers
    dataRows.forEach((row, index) => {
      const name = row["الاسم"] || `Student ${index + 4}`;
      const answers = [];
      console.log(name);
      // Collect answers to questions 1 to 22
      for (let q = 1; q <= 22; q++) {
        const questionKey = `Question ${q}`;
        answers.push(row[questionKey]);
      }

      students.push({ name, answers });
    });

    const pairs = [];

    // Generate all possible pairs of students
    for (let i = 0; i < students.length; i++) {
      for (let j = i + 1; j < students.length; j++) {
        const studentA = students[i];
        const studentB = students[j];
        let sameAnswersCount = 0;

        // Compare answers question by question
        for (let k = 0; k < studentA.answers.length; k++) {
          if (studentA.answers[k] === studentB.answers[k]) {
            sameAnswersCount++;
          }
        }

        pairs.push({
          studentA: studentA.name,
          studentB: studentB.name,
          sameAnswersCount,
        });
      }
    }

    // Sort the pairs in descending order of identical answers
    pairs.sort((a, b) => b.sameAnswersCount - a.sameAnswersCount);

    // Output the top three pairs
    console.log("Top three pairs with the most identical answers:");
    for (let i = 0; i < Math.min(3, pairs.length); i++) {
      const pair = pairs[i];
      console.log(
        `${i + 1}. ${pair.studentA} and ${pair.studentB} have ${
          pair.sameAnswersCount
        } identical answers.`
      );
    }

  

    const ratio = {}; 
    pairs.forEach((pair) => {
      if (!ratio[pair.sameAnswersCount]) {
        ratio[pair.sameAnswersCount] = 0;
      }
      ratio[pair.sameAnswersCount]++;
    }); 

    for (let i in ratio) {
      console.log(
        ` ${i} identical answers: ${ratio[i]} pairs , ${
          (ratio[i] / pairs.length) * 100
        }% `
      );
    }


    const width = 1200;
    const height = 600;
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext("2d");

    // Set background color
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, width, height);

    // Set text properties
    ctx.fillStyle = "#000";
    ctx.font = "20px Arial";

    // Calculate the maximum value for scaling
    const maxPairs = Math.max(...Object.values(ratio));

    // Draw the bars
    const barWidth = 50;
    const barSpacing = 20;
    let x = 50;
    for (let i in ratio) {
      const barHeight = (ratio[i] / maxPairs) * (height - 100);
      ctx.fillStyle = "#3498db";
      ctx.fillRect(x, height - barHeight - 50, barWidth, barHeight);

      // Draw the labels
      ctx.fillStyle = "#000";
      ctx.fillText(
        `${i} (${((ratio[i] / pairs.length) * 100).toFixed(2)}%)`,
        x,
        height - 20
      );
      x += barWidth + barSpacing;
    }

    // Save the canvas to a file
    const buffer = canvas.toBuffer("image/png");
    fs.writeFileSync("ratio_graph.png", buffer);
    console.log("Graph has been saved to ratio_graph.png");
  



    const writer = csvWriter({
      path: "pairs.csv",
      header: [
        { id: "studentA", title: "Student A" },
        { id: "studentB", title: "Student B" },
        { id: "sameAnswersCount", title: "Identical Answers" },
      ],
    });

    writer
      .writeRecords(pairs)
      .then(() => {
        console.log("Pairs have been written to pairs.csv");
      })
      .catch((err) => {
        console.error("Error writing to CSV file", err);
      });
  });
