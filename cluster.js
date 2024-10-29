const fs = require('fs'); 
const hclust = require('ml-hclust');

function clusterData(pairs) {
 
  const data = pairs;

  // Create a mapping from person to index
  const personIndex = {};
  let index = 0;
  data.forEach(({ firstPerson, secondPerson }) => {
    if (!personIndex.hasOwnProperty(firstPerson)) {
      personIndex[firstPerson] = index++;
    }
    if (!personIndex.hasOwnProperty(secondPerson)) {
      personIndex[secondPerson] = index++;
    }
  });

  // Create the distance matrix
  const matrixSize = Object.keys(personIndex).length;
  const distanceMatrix = Array.from({ length: matrixSize }, () => Array(matrixSize).fill(Infinity));

  // Fill the matrix with distances
  data.forEach(({ firstPerson, secondPerson, number }) => {
    const i = personIndex[firstPerson];
    const j = personIndex[secondPerson];
    const distance = 10 - Number(number); // Assuming 10 is the max similarity score
    distanceMatrix[i][j] = distance;
    distanceMatrix[j][i] = distance; // For undirected graph
  });

  // Apply hierarchical clustering
  const result = hclust.agnes(distanceMatrix, { method: 'average' });

  // Generate a dendrogram (this part is pseudo-code and would need a way to visualize it)
  console.log('Clusters:', result);
}



module.exports = { clusterData };