const gridBox = document.querySelector("#grid")
const mainButton = document.querySelector("#mainButton")
const commands = document.querySelector("#commands")
const resetButton = document.createElement("button");
resetButton.innerHTML = "Reset!";
resetButton.classList = "button";
let sudokuGrid = [[], [], [], [], [], [], [], [], []]


// Function creating the grid as an array and displaying it:
function generateGrid() {
  for (iteration = 0; iteration < 81; iteration++) {
    indexRow = Math.floor(iteration / 9)
    indexColumn = iteration % 9
    sudokuGrid[indexRow][indexColumn] = document.createElement("input");
    sudokuGrid[indexRow][indexColumn].type = "number"
    sudokuGrid[indexRow][indexColumn].classList = "cell"
    sudokuGrid[indexRow][indexColumn].id = "cell" + iteration
    sudokuGrid[indexRow][indexColumn].min = "1"
    sudokuGrid[indexRow][indexColumn].max = "9"
    gridBox.appendChild(sudokuGrid[indexRow][indexColumn]);
    if (indexRow === 3 || indexRow === 6) {
      sudokuGrid[indexRow][indexColumn].style.borderTop = "7px solid #333"
    }
    if (indexColumn === 3 || indexColumn === 6) {
      sudokuGrid[indexRow][indexColumn].style.borderLeft = "7px solid #333"
    }
  }
}

function mainButtonClick() {
  if (mainButton.innerHTML === "Generate!") {
    generateGrid();
    mainButton.innerHTML = "Submit!";
    commands.appendChild(resetButton);
  }
}

function resetButtonClick() {
  for (iteration = 0; iteration < 81; iteration++) {
    document.querySelector("#cell" + iteration).value = "";
  }
}

mainButton.addEventListener("click", mainButtonClick);
resetButton.addEventListener("click", resetButtonClick);