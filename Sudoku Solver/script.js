const gridBox = document.querySelector("#grid")
const mainButton = document.querySelector("#mainButton")
const commands = document.querySelector("#commands")

const resetButton = document.createElement("button");
resetButton.id = "resetButton"
resetButton.classList.add("button");
resetButton.innerHTML = "Reset!";

let sudokuGrid = []
let sudokuGridValues = [[], [], [], [], [], [], [], [], []]

let trackingWay = 1;

// Function getting the index of the Row and Column of a given cell:
function getIndexRow(cellNumber) { return Math.floor(cellNumber / 9); }
function getIndexColumn(cellNumber) { return cellNumber % 9; }
function getRow(cellNumber) { return sudokuGridValues[getIndexRow(cellNumber)]; }
function getColumn(cellNumber) {
  let indexColumn = getIndexColumn(cellNumber);
  return sudokuGridValues.map(function (row) { return row[indexColumn]; });
}

function getSubGrid(cellNumber) {
  let startingIndexRow = Math.floor(getIndexRow(cellNumber) / 3) * 3; // The result is equal to 0, 3 or 6.
  let startingIndexColumn = Math.floor(getIndexColumn(cellNumber) / 3) * 3; // The result is equal to 0, 3 or 6.
  let subGrid = sudokuGridValues.slice(startingIndexRow, startingIndexRow + 3).map(function (row) {
    return row.slice(startingIndexColumn, startingIndexColumn + 3);
  })
  return subGrid[0].concat(subGrid[1], subGrid[2]);
}


// Function creating the grid as an array and displaying it:
function generateGrid() {
  for (cellNumber = 0; cellNumber < 81; cellNumber++) {
    sudokuGrid[cellNumber] = document.createElement("input");
    sudokuGrid[cellNumber].type = "number";
    sudokuGrid[cellNumber].classList.add("cell");
    sudokuGrid[cellNumber].id = "cell" + cellNumber;
    sudokuGrid[cellNumber].min = "1";
    sudokuGrid[cellNumber].max = "9";
    gridBox.appendChild(sudokuGrid[cellNumber]);
    if (getIndexRow(cellNumber) === 3 || getIndexRow(cellNumber) === 6) {
      sudokuGrid[cellNumber].style.borderTop = "7px solid #333";
    }
    if (getIndexColumn(cellNumber) === 3 || getIndexColumn(cellNumber) === 6) {
      sudokuGrid[cellNumber].style.borderLeft = "7px solid #333";
    }
  }
}

// Function filling sudokuGridValues and adding a class to the cell already having a value:
function prepareGrid() {
  for (cellNumber = 0; cellNumber < 81; cellNumber++) {
    if (sudokuGrid[cellNumber].value) {
      if (sudokuGrid[cellNumber].value > 9 || sudokuGrid[cellNumber].value < 1 || isNaN(sudokuGrid[cellNumber].value)) {
        alert("Some values are incorrect!");
        return false;
      }
      sudokuGrid[cellNumber].classList.add("userInput");
    }
    sudokuGridValues[getIndexRow(cellNumber)][getIndexColumn(cellNumber)] = Number(sudokuGrid[cellNumber].value);
  }
  return true;
}

function clearValues() {
  for (cellNumber = 0; cellNumber < 81; cellNumber++) {
    if (sudokuGrid[cellNumber].className.includes("userInput")) { sudokuGrid[cellNumber].classList.remove("userInput") }
    else {
      sudokuGridValues[getIndexRow(cellNumber)][getIndexColumn(cellNumber)] = 0;
      sudokuGrid[cellNumber].value = "";
    }
  }
}

function solveSudoku() {
  for (cellNumber = 0; cellNumber < 81; cellNumber += trackingWay) {
    let currentCell = sudokuGrid[cellNumber]
    if (currentCell.className.includes("userInput")) { continue; } // The cell is skipped is already filled by the user.
    let currentIndexRow = getIndexRow(cellNumber);
    let currentIndexColumn = getIndexColumn(cellNumber);
    // If the value is already equals to 9, it is set back to an empty string and the previous value will be tested:
    if (currentCell.value == 9) {
      currentCell.value = "";
      sudokuGridValues[currentIndexRow][currentIndexColumn] = 0;
      trackingWay = -1;
      continue;
    }
    if (!(currentCell.value)) { currentCell.value = 1 } // The value is set to 1 if empty.
    let currentRow = getRow(cellNumber);
    let currentColumn = getColumn(cellNumber);
    let currentSubGrid = getSubGrid(cellNumber);
    for (testValue = Number(currentCell.value); testValue < 10; testValue++) {
      currentCell.value = testValue;
      // If the value is already in the row, column or subgrid, the next value is tested:
      if (currentRow.includes(testValue) || currentColumn.includes(testValue) || currentSubGrid.includes(testValue)) {
        // If the value is already equals to 9, it is set back to an empty string and the previous value will be tested:
        if (testValue == 9) {
          currentCell.value = "";
          sudokuGridValues[currentIndexRow][currentIndexColumn] = 0;
          trackingWay = -1;
        }
        continue;
        // If the value is not found in the row, column or subgrid, the value is added to the grid, and the next cell is tested.
      } else {
        sudokuGridValues[currentIndexRow][currentIndexColumn] = testValue;
        trackingWay = 1;
        break;
      }
    }
  }
}


// BUTTONS CONTROLS

function mainButtonClick() {
  if (mainButton.innerHTML === "Generate!") {
    generateGrid();
    mainButton.innerHTML = "Submit!";
    commands.appendChild(resetButton);
  } else if (mainButton.innerHTML === "Submit!") {
    if (prepareGrid()) {
      solveSudoku()
      mainButton.innerHTML = "Clear!";
    }
  } else if (mainButton.innerHTML === "Clear!") {
    clearValues();
    mainButton.innerHTML = "Submit!";
  }
}

function resetButtonClick() {
  for (cellNumber = 0; cellNumber < 81; cellNumber++) {
    document.querySelector("#cell" + cellNumber).value = "";
    mainButton.innerHTML = "Submit!";
  }
}

mainButton.addEventListener("click", mainButtonClick);
resetButton.addEventListener("click", resetButtonClick);