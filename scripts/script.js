const grid = document.querySelector("#grid"); // Select the grid element
const generate = document.querySelector("#generate"); // Select the generate button
const commands = document.querySelector("#commands"); // Select the commands section

// Create and configure the reset button
const reset = document.createElement("button");
reset.id = "reset";
reset.classList.add("button");
reset.innerHTML = "Reset!";

// Define the sudoku object with its properties and methods
const sudoku = {
  tracker: 1,
  cell: {
    value: 1,
    at: {
      // Calculate the row index of a cell
      row: (cell = this.cell.value) => {
        return Math.floor(cell / 9);
      },
      // Calculate the column index of a cell
      column: (cell = this.cell.value) => {
        return cell % 9;
      }
    },
    in: {
      // Get the values in the same row as the cell
      row: (cell = this.cell.value) => {
        return sudoku.values[sudoku.cell.at.row(cell)];
      },
      // Get the values in the same column as the cell
      column: (cell = this.cell.value) => {
        let index = sudoku.cell.at.column(cell);
        return sudoku.values.map(row => row[index]);
      },
      // Get the values in the same 3x3 square as the cell
      square: (cell = this.cell.value) => {
        const start = {
          row: Math.floor(sudoku.cell.at.row(cell) / 3) * 3,
          column: Math.floor(sudoku.cell.at.column(cell) / 3) * 3
        };
        let square = sudoku.values.slice(start.row, start.row + 3).map(row => row.slice(start.column, start.column + 3));
        return square[0].concat(square[1], square[2]);
      }
    }
  },
  elements: [], // Array to store the cell elements
  values: [[], [], [], [], [], [], [], [], []] // 2D array to store the sudoku values
};

// Function to generate the sudoku grid
async function generateGrid() {
  let cell = 0;
  let interval = setInterval(function () {
    // Create and configure each cell input element
    sudoku.elements[cell] = document.createElement("input");
    sudoku.elements[cell].type = "number";
    sudoku.elements[cell].classList.add("cell");
    sudoku.elements[cell].id = "cell" + cell;
    sudoku.elements[cell].min = "1";
    sudoku.elements[cell].max = "9";
    grid.appendChild(sudoku.elements[cell]);
    // Add thicker borders for 3x3 grid separation
    if (sudoku.cell.at.row(cell) === 3 || sudoku.cell.at.row(cell) === 6) {
      sudoku.elements[cell].style.borderTop = "7px solid #333";
    }
    if (sudoku.cell.at.column(cell) === 3 || sudoku.cell.at.column(cell) === 6) {
      sudoku.elements[cell].style.borderLeft = "7px solid #333";
    }
    cell++;
    if (cell === 81) {
      clearInterval(interval); // Stop the interval when all cells are created
    }
  }, 20);
}

// Function to prepare the sudoku values from the input elements
function prepare() {
  for (let cell = 0; cell < 81; cell++) {
    if (sudoku.elements[cell].value) {
      if (sudoku.elements[cell].value > 9 || sudoku.elements[cell].value < 1 || isNaN(sudoku.elements[cell].value)) {
        alert("Some values are incorrect!"); // Alert if any value is invalid
        return false;
      }
      sudoku.elements[cell].classList.add("input"); // Mark the cell as input
    }
    // Store the value in the sudoku values array
    sudoku.values[sudoku.cell.at.row(cell)][sudoku.cell.at.column(cell)] = Number(sudoku.elements[cell].value);
  }
  return true;
}

// Function to clear the sudoku grid
function clear() {
  for (let cell = 0; cell < 81; cell++) {
    if (sudoku.elements[cell].className.includes("input")) {
      sudoku.elements[cell].classList.remove("input"); // Remove input class from cells
    } else {
      // Reset the value in the sudoku values array and clear the input element
      sudoku.values[sudoku.cell.at.row(cell)][sudoku.cell.at.column(cell)] = 0;
      sudoku.elements[cell].value = String();
    }
  }
}

// Function to solve the sudoku puzzle
async function solve() {
  for (let cell = 0; cell < 81; cell += sudoku.tracker) {
    let current = sudoku.elements[cell];
    if (current.className.includes("input")) {
      continue; // Skip cells that are marked as input
    }
    const index = {
      row: sudoku.cell.at.row(cell),
      column: sudoku.cell.at.column(cell)
    };
    if (Number(current.value) === 9) {
      current.value = String();
      sudoku.values[index.row][index.column] = 0;
      sudoku.tracker--;
      continue;
    }
    if (!(current.value)) {
      current.value = 1;
    }
    sudoku.cell.value = Number(current.value);
    const { row, column, square } = sudoku.cell.in;
    for (let test = Number(current.value); test < 10; test++) {
      current.value = test;
      if (row(cell).includes(test) || column(cell).includes(test) || square(cell).includes(test)) {
        if (test === 9) {
          current.value = String();
          sudoku.values[index.row][index.column] = 0;
          sudoku.tracker = -1;
        }
      } else {
        sudoku.values[index.row][index.column] = test;
        sudoku.tracker = 1;
        break;
      }
    }
  }
}

// Function to handle the generate button click
function launch() {
  console.log(sudoku);
  if (generate.innerHTML === "Generate!") {
    generateGrid().then(r => {
      generate.innerHTML = "Submit!";
      commands.appendChild(reset); // Add the reset button
    });
  } else if (generate.innerHTML === "Submit!") {
    if (prepare()) {
      solve().then(() => {
        generate.innerHTML = "Clear!";
      });
    }
  } else if (generate.innerHTML === "Clear!") {
    clear();
    generate.innerHTML = "Submit!";
  }
}

// Function to clear the grid values
function clean() {
  for (let cell = 0; cell < 81; cell++) {
    document.querySelector("#cell" + cell).value = String();
    generate.innerHTML = "Submit!";
  }
}

// Add event listeners to the generate and reset buttons
generate.addEventListener("click", launch);
reset.addEventListener("click", clean);