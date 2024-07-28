const validMoves = [[2, 1], [2, -1], [-2, 1], [-2, -1], 
                    [-1, 2], [-1, -2], [1, 2], [1, -2]];
function arraysEqual(arr1 = [], arr2 = []) {
  if (arr1.length !== arr2.length) return false;
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) return false;
  }
  return true;
}
function possibleMoves(start, end) {
  let possibilities = [start];
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
function knightMoves(start, end) {
  let queue = possibleMoves(start, end);
  let visitedCheck = new Set(queue.map(move => move.toString())); // Need to convert to string for comparable format, sets unordered
  let endStr = end.toString(); // Just for comparison since Sets are weird.
  let visited = [...queue]; // This is the one we will use
  console.log("Queue: ");
  console.log(queue);
  console.log("Visited: ");
  console.log(visited)
  console.log("----------------------");
  if (visitedCheck.has(endStr)) {
    console.log("Only 2")
    return visited;
  }
  while (queue.length !== 0) { // If end is not within 1 move of the start (meaning only 2 like 0,0 and 1,2 as ending)
    let specificMove = queue.shift();
    let possible = possibleMoves(specificMove);
    for (let i = 0; i < possible.length; i++) {
      if (arraysEqual(possible[i], end)) {
        visited.push(possible[i]);
        console.log("More than 2");
        return visited;
      } else {
        if (!visited.includes(possible[i])) {
          visited.push(possible[i]);
        } else {
          continue;
        }
      }
    }
  }
  // console.log("Queue: ");
  // console.log(queue);
  // console.log("Visited: ");
  // console.log(visited)
  // console.log("----------------------");
}
function getPath(start, end, visited) { // Finds the shortest path
  console.log("GET PATH -------------");
  console.log("Original visited: ");
  console.log(visited);
  let removeDup = new Set(visited.map(arr => JSON.stringify(arr))); // Visited has arrays as elements, must convert to string so duplicates 
  // can be removed easily, otherwise it will still retain all elements, since the arrays are all "different" in terms of "reference" in memory
  console.log("Remove DUP: ")
  console.log(removeDup);
  let visit = Array.from(removeDup).map(str => JSON.parse(str));
  console.log("Visit: ");
  console.log(visit)
  let path = [];
  let xCoord = null;
  let xStart = start[0];
  for (let i = 0; i < visit.length; i++) { // Looking at x values
    if (path.includes(end)) {
      break;
    }
    if (xCoord === null) { // Insert starting move
      xCoord = visit[0][0];
      xStart = xCoord;
      path.push(visit[0]);
    } else { // Start looking at next valid values - we look at x values only, descend down one by one (can apply to y values as well)
      xCoord = visit[i][0]; // Compare x values
      if ((xCoord > xStart) && (xCoord - xStart <= 1)) { // Difference must be 1, ascending down a level
        path.push(visit[i]);
        xStart = xCoord;
      }
    }
    // if (arraysEqual(visit[i + 1], end)) {
    // }
  }
  console.log("Path: ");
  return path;
}
let start = [0,0];
let end = [3,3];
let move = knightMoves(start, end);
console.log(move);
console.log(move.length);
console.log();
console.log("---------------------------------");
console.log();
console.log(getPath(start, end, move));


// given start and end, place it in adjacency list, and iterate through valid moves
// valid moves will become a node or "edges" in the list
// then use breathe first search to find shortest path
/*
[0, 0] -> [3, 3]

[0, 0] -> [2, 1]
[1, 2]

  0 1 2 3 4 5 6 7
0 
1
2
3
4
5
6
7

0,0 - 2,1 - 3,3
0,0 - 1,2 - 3,3
0,0
try think of solving it via one dimension,
focus on x axis for example, view it as nodes, and the y axis as height/levels
vice versa

*/