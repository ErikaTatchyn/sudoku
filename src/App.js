import React, { useState } from "react";
import Timer from "./components/Timer";
import SudokuGrid from "./components/SudokuGrid";
import axios from "axios";

function App() {
  const initialGrid = [
    [2, 9, 0, 0, 0, 0, 0, 7, 0],
    [3, 0, 6, 0, 0, 8, 4, 0, 0],
    [8, 0, 0, 0, 4, 0, 0, 0, 2],
    [0, 2, 0, 0, 3, 1, 0, 0, 7],
    [0, 0, 0, 0, 8, 0, 0, 0, 0],
    [1, 0, 0, 9, 5, 0, 0, 6, 0],
    [7, 0, 0, 0, 9, 0, 0, 0, 1],
    [0, 0, 1, 2, 0, 0, 3, 0, 6],
    [0, 3, 0, 0, 0, 0, 0, 9, 5],
  ];

  const [grid, setGrid] = useState(initialGrid);

  function isSudokuValid(board) {
    // Check rows, columns, and 3x3 subgrids for duplicates
    for (let i = 0; i < 9; i++) {
      const rowValues = [];
      const colValues = [];
      const subgridValues = [];

      for (let j = 0; j < 9; j++) {
        // Check rows
        const rowCellValue = board[i][j];
        if (rowCellValue !== 0) {
          if (rowValues.includes(rowCellValue)) return false;
          rowValues.push(rowCellValue);
        }

        // Check columns
        const colCellValue = board[j][i];
        if (colCellValue !== 0) {
          if (colValues.includes(colCellValue)) return false;
          colValues.push(colCellValue);
        }

        // Check 3x3 subgrids
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

  const handleCellClick = (row, col, newValue) => {
    // Handle user input and update the grid
    const updatedGrid = [...grid];
    updatedGrid[row][col] = newValue;
    setGrid(updatedGrid);
    console.log("isSudokuValid(updatedGrid)", isSudokuValid(updatedGrid));

    // Send the updated grid to the backend
    axios
      .post("/api/update-grid", { grid: updatedGrid }) // Adjust the API endpoint
      .then((response) => {
        if (response.data.success) {
          // Check for game completion
          if (response.data.isComplete) {
            // Game is complete, you can display a success message
            alert("Congratulations! You solved the Sudoku puzzle!");
          } else if (!response.data.isValid) {
            // Invalid move, display an error message
            alert("Invalid move. Please check your input.");
          }
        } else {
          alert("Failed to update grid on the server.");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Failed to communicate with the server.");
      });
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
