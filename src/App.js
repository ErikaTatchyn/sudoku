import React, { useState } from "react";
import Timer from "./components/Timer";
import SudokuGrid from "./components/SudokuGrid";

function App() {
  const initialGrid = [
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [6, 0, 0, 1, 9, 5, 0, 0, 0],
    [0, 9, 8, 0, 0, 0, 0, 6, 0],
    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    [4, 0, 0, 8, 0, 3, 0, 0, 1],
    [7, 0, 0, 0, 2, 0, 0, 0, 6],
    [0, 6, 0, 0, 0, 0, 2, 8, 0],
    [0, 0, 0, 4, 1, 9, 0, 0, 5],
    [0, 0, 0, 0, 8, 0, 0, 7, 9],
  ];

  const [grid, setGrid] = useState(initialGrid);

  function isSudokuValid(board) {
    // Check rows
    for (let row = 0; row < 9; row++) {
      const rowSet = new Set();
      for (let col = 0; col < 9; col++) {
        const cellValue = board[row][col];
        if (cellValue === 0) continue; // Skip empty cells
        if (rowSet.has(cellValue)) return false; // Duplicate number found
        rowSet.add(cellValue);
      }
    }

    // Check columns
    for (let col = 0; col < 9; col++) {
      const colSet = new Set();
      for (let row = 0; row < 9; row++) {
        const cellValue = board[row][col];
        if (cellValue === 0) continue; // Skip empty cells
        if (colSet.has(cellValue)) return false; // Duplicate number found
        colSet.add(cellValue);
      }
    }

    // Check 3x3 subgrids
    for (let rowStart = 0; rowStart < 9; rowStart += 3) {
      for (let colStart = 0; colStart < 9; colStart += 3) {
        const subgridSet = new Set();
        for (let row = rowStart; row < rowStart + 3; row++) {
          for (let col = colStart; col < colStart + 3; col++) {
            const cellValue = board[row][col];
            if (cellValue === 0) continue; // Skip empty cells
            if (subgridSet.has(cellValue)) return false; // Duplicate number found
            subgridSet.add(cellValue);
          }
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

  const handleCellClick = (row, col, newValue) => {
    // Handle user input and update the grid
    const updatedGrid = [...grid];
    updatedGrid[row][col] = newValue;
    setGrid(updatedGrid);

    // Check for game completion
    if (isSudokuComplete(updatedGrid)) {
      // Game is complete, you can display a success message
      alert("Congratulations! You solved the Sudoku puzzle!");
    } else if (!isSudokuValid(updatedGrid)) {
      // Invalid move, display an error message
      alert("Invalid move. Please check your input.");
    }
  };

  return (
    <div>
      <h1>Sudoku Game</h1>
      <Timer />
      <SudokuGrid grid={grid} handleCellClick={handleCellClick} />
      {/* Add other game elements as needed */}
    </div>
  );
}

export default App;
