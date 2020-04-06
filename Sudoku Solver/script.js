let sudokuGrid = document.querySelector("#grid")
let cells = document.querySelectorAll(".cell");
let button = document.querySelector("#solve")

function generateGrid() {
  for (iteration = 0; iteration < 81; iteration++) {
    var sudokuCell = document.createElement("input");
    sudokuCell.type = "number"
    sudokuCell.classList = "cell"
    sudokuCell.id = "cell" + iteration
    sudokuCell.min = "1"
    sudokuCell.max = "9"
    sudokuGrid.appendChild(sudokuCell);
  }
}

button.addEventListener("click", function() {
  if (button.innerHTML === "Generate!") {
    generateGrid();
    button.innerHTML = "Submit!"}
});

