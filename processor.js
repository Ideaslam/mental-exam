// processor.js

function processStudentData(students) {
    const pairs = [];
  
    for (let i = 0; i < students.length; i++) {
      for (let j = i + 1; j < students.length; j++) {
        const studentA = students[i];
        const studentB = students[j];
        let sameAnswersCount = 0;
  
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
    console.log('Top three pairs with the most identical answers:');
    for (let i = 0; i < Math.min(3, pairs.length); i++) {
      const pair = pairs[i];
      console.log(
        `${i + 1}. ${pair.studentA} and ${pair.studentB} have ${
          pair.sameAnswersCount
        } identical answers.`
      );
    }
  
    return pairs;
  }
  
  module.exports = { processStudentData };
  