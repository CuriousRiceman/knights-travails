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

function knightMoves(start, end) {
  let moves = possibleMoves(start);
  let queue = [ [start] ];
  let visited = [];

  while (queue.length !== 0) {
    console.log(queue);
    let specificPath = queue.shift();

    let previousPosition = specificPath[specificPath.length - 1];
    //console.log(previousPosition)

    if (previousPosition[0] === end[0] && previousPosition[1] === end[1]) {
      console.log("FOUND ONE");
      return specificPath;
    }

    if (!isCoordinateInArray(visited, previousPosition)) {
      visited.push(previousPosition);

      let moreMoves = possibleMoves(previousPosition);

      for (let i = 0; i < moreMoves.length; i++) {
        if (!isCoordinateInArray(visited, moreMoves[i])) {
          queue.push([...specificPath, moreMoves[i]]);
        }
      }
    }
  }

}

let start = [0,0];
let end = [7,7];
console.log(knightMoves(start, end));