const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());

const mongoURI = "mongodb://localhost:27017/sudoku-db";
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

const sudokuSchema = new mongoose.Schema({
  grid: [[Number]],
});

const Sudoku = mongoose.model("Sudoku", sudokuSchema);

function isSudokuValid(board) {
  // Check rows, columns, and 3x3 subgrids for duplicates
  for (let i = 0; i < 9; i++) {
    const rowValues = [];
    const colValues = [];
    const subgridValues = [];

    for (let j = 0; j < 9; j++) {
      const rowCellValue = board[i][j];
      if (rowCellValue !== 0) {
        if (rowValues.includes(rowCellValue)) return false;
        rowValues.push(rowCellValue);
      }

      const colCellValue = board[j][i];
      if (colCellValue !== 0) {
        if (colValues.includes(colCellValue)) return false;
        colValues.push(colCellValue);
      }

      const subgridRow = 3 * Math.floor(i / 3) + Math.floor(j / 3);
      const subgridCol = 3 * (i % 3) + (j % 3);
      const subgridCellValue = board[subgridRow][subgridCol];
      if (subgridCellValue !== 0) {
        if (subgridValues.includes(subgridCellValue)) return false;
        subgridValues.push(subgridCellValue);
      }
    }
  }

  return true; // No issues found, Sudoku is valid
}

function isSudokuComplete(board) {
  // Check if there are any empty cells (cells with a value of 0)
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (board[row][col] === 0) {
        return false; // There's at least one empty cell, Sudoku is not complete
      }
    }
  }

  // Check rows, columns, and 3x3 subgrids for duplicates
  return isSudokuValid(board);
}

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.post("/api/update-grid", (req, res) => {
  const updatedGrid = req.body.grid;

  const isValid = isSudokuValid(updatedGrid);
  const isComplete = isSudokuComplete(updatedGrid);

  res.json({ isValid, isComplete, success: true });
});

// Check Sudoku validity and completion
app.post("/api/check-sudoku", (req, res) => {
  const sudokuGrid = req.body;

  const isValid = isSudokuValid(sudokuGrid);
  const isComplete = isSudokuComplete(sudokuGrid);

  res.json({ isValid, isComplete });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
