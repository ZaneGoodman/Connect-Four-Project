/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const WIDTH = 7;
const HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
let board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard() {
  // TODO: set "board" to empty HEIGHT x WIDTH matrix array
  for(let i = 0; i < HEIGHT; i++) {
    board[i] = Array.from(WIDTH).fill(null);
  }
}

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
  const htmlBoard = document.getElementById("board")
 // Create top row & give it an id of column-top. Establish the leangth of the row by looping through the width
 //create all headcells. append them to the top row and append that row to the board.
  const top = document.createElement("tr");
  top.setAttribute("id", "column-top");
  top.addEventListener("click", handleClick);

  for (let x = 0; x < WIDTH; x++) {
    const headCell = document.createElement("td");
    headCell.setAttribute("id", x);
    top.append(headCell);
  }
  htmlBoard.append(top);

 // Establish the Height of the board by looping through it and creating that amount of rows. Establish the amount of cells in those rows by looping through the Width.
 // create that many cells. give them an id of a y-x cordinate to corispond with their placement on the board. Also add a class of cell in order to access them later in CheckForTie
 // append the cells to the rows just created and append it all to the board. 
  for (let y = 0; y < HEIGHT; y++) {
    const row = document.createElement("tr");
    for (let x = 0; x < WIDTH; x++) {
      const cell = document.createElement("td");
      cell.setAttribute("id", `${y}-${x}`);
      cell.classList.add("cell")
      row.append(cell);
    }
    htmlBoard.append(row);
  }
};



/** findSpotForCol: given column x, return top empty y (null if filled) */
function findSpotForCol(x) {
   for(let y = 5; y < HEIGHT; y--) {
    if(board[y][x] === undefined) return y;
   }
  return null;
};


/** placeInTable: update DOM to place piece into HTML table of board */
function placeInTable(y, x) {
// make a div and insert into correct table cell
    const div = document.createElement("div");
    div.classList.add("piece", "p" + currPlayer);
    
    const cell = document.getElementById(`${y}-${x}`)
    cell.append(div);
};

/** endGame: announce game end */
function endGame(msg) {
  alert(msg);
};



/** handleClick: handle click of column top to play piece */
function handleClick(evt) {
  // get x from ID of clicked cell
  const x = +evt.target.id;
 
  // get next spot in column (if none, ignore click)
  const y = findSpotForCol(x);
  if (y === null) {
    return;
  }
// place piece in board and add to HTML table
    board[y][x] = currPlayer;
    placeInTable(y, x);

// check for win
      if (checkForWin()) {
        return endGame(`Player ${currPlayer} won!`);
      }
//check for tie
        if(checkForTie()) {
          return endGame("It's a Draw!")
        }
//switch player
          if( currPlayer === 1) {
                currPlayer = 2;
          } else {
            currPlayer = 1
          }

};


//pinpoint playable cells, put them in an array, filter out all unplayed pieces, if the new array of played pieces 
// exceeds the total number of cells. return true. alert is called

function checkForTie() {
const allCells = document.getElementsByClassName('cell')
  const tieArr = [ ...allCells ];
      let playedCells = tieArr.filter((value) => {
        return value.innerHTML !== '';
    });
      if (playedCells.length === 42) {
        return true;
    }
  };



/** checkForWin: check board cell-by-cell for "does a win start here?" */
function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }

  // MY NOTES:
  // Loop through the Height and Width of the HTML board.   Then set arrays and subarrays to variables that define what index cordinate conditions on the board a player needs to meet in order to win.
  //  Afterwards using an if statement pass those variables through the _win function. This will check if the players pieces are in
  // proper spots and if all placed pieces are placed by the same player. if atleast one of these returns true then the entire function is true and an alert is called. 

  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      let horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      let vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      let diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      let diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}


makeBoard();
makeHtmlBoard();