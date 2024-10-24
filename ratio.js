// ratio.js

function calculateRatios(pairs) {
    const ratio = {};
    const totalPairs = pairs.length;
  
    pairs.forEach((pair) => {
      if (!ratio[pair.sameAnswersCount]) {
        ratio[pair.sameAnswersCount] = 0;
      }
      ratio[pair.sameAnswersCount]++;
    });
  
    for (let count in ratio) {
      console.log(
        `${count} identical answers: ${ratio[count]} pairs, ${
          ((ratio[count] / totalPairs) * 100).toFixed(2)
        }%`
      );
    }
  
    return { ratio, totalPairs };
  }
  
  module.exports = { calculateRatios };
  