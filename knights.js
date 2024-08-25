const validMoves = [[2, 1], [2, -1], [-2, 1], [-2, -1], 
                    [-1, 2], [-1, -2], [1, 2], [1, -2]];

function possibleMoves(start) {
  let possibilities = [];
  let xStart = start[0];
  let yStart = start[1];
  for (let i = 0; i < validMoves.length; i++) {
    let move = validMoves[i];
    let xNew = xStart + move[0];
    let yNew = yStart + move[1];
    if ((xNew >= 0 && xNew <= 7) && (yNew >= 0 && yNew <= 7)) {
      possibilities.push([xNew, yNew])
    }
  }
  return possibilities;
}

function isCoordinateInArray(array, coordinate) {
  return array.some(([x, y]) => x === coordinate[0] && y === coordinate[1]);
}

function generateList(start, end) {
  let queue = [start];
  let adjacencyList = [];
  let visited = [];
  while (queue.length !== 0) {
    let specificMove = queue.shift();
    let possibleMove = possibleMoves(specificMove);
    
    if (!isCoordinateInArray(visited, specificMove)) {
      visited.push(specificMove);
      adjacencyList.push([ specificMove, [...possibleMove] ])

      if (isCoordinateInArray(possibleMove, end)) {
        break;
      } else {
        for (let i = 0; i < possibleMove.length; i++) {
          if (!isCoordinateInArray(visited, possibleMove[i])) {
            queue.push(possibleMove[i]);
          } else {
            continue;
          }
        }
      }

    } else {
      continue;
    }
  }
  return adjacencyList;
}

function checkForPath(adjacencyList, start, end) {
  let path = [];
  let queue = [[start]]; // Queue of paths
  let visited = new Set();
  visited.add(start.toString());

  while (queue.length > 0) {
    let currentPath = queue.shift(); // Get the current path
    let currentNode = currentPath[currentPath.length - 1]; // Last node in the path

    if (currentNode.toString() === end.toString()) {
      return currentPath; // Found the path to the end
    }

    for (let [node, neighbors] of adjacencyList) {
      if (node.toString() === currentNode.toString()) {
        for (let neighbor of neighbors) {
          if (!visited.has(neighbor.toString())) {
            visited.add(neighbor.toString());
            queue.push([...currentPath, neighbor]); // Extend the path and add to queue
          }
        }
      }
    }
  }

  return []; // No path found
}

function knightMoves(start, end) {
  let generatedList = generateList(start, end);
  let path = checkForPath(generatedList, start, end)
  return path;
}


let start = [3,3];
let end = [3,4];
console.log(knightMoves(start, end));