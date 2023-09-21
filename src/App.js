import React, { useState } from "react";
import Timer from "./components/Timer";
import SudokuGrid from "./components/SudokuGrid";
import axios from "axios";
import { Box, Button, Typography } from "@mui/material";

function App() {
  const initialGrid = [
    [3, 0, 6, 5, 0, 8, 4, 0, 0],
    [5, 2, 0, 0, 0, 0, 0, 0, 0],
    [0, 8, 7, 0, 0, 0, 0, 3, 1],
    [0, 0, 3, 0, 1, 0, 0, 8, 0],
    [9, 0, 0, 8, 6, 3, 0, 0, 5],
    [0, 5, 0, 0, 9, 0, 6, 0, 0],
    [1, 3, 0, 0, 0, 0, 2, 5, 0],
    [0, 0, 0, 0, 0, 0, 0, 7, 4],
    [0, 0, 5, 2, 0, 6, 3, 0, 0],
  ];

  const completeGrid = [
    [3, 1, 6, 5, 7, 8, 4, 9, 2],
    [5, 2, 9, 1, 3, 4, 7, 6, 8],
    [4, 8, 7, 6, 2, 9, 5, 3, 1],
    [2, 6, 3, 4, 1, 5, 9, 8, 7],
    [9, 7, 4, 8, 6, 3, 1, 2, 5],
    [8, 5, 1, 7, 9, 2, 6, 4, 3],
    [1, 3, 8, 9, 4, 7, 2, 5, 6],
    [6, 9, 2, 3, 5, 1, 8, 7, 4],
    [7, 4, 5, 2, 8, 6, 3, 1, 9],
  ];

  const [grid, setGrid] = useState(initialGrid);
  const [showSolution, setShowSolution] = useState(false);

  const handleCheckSolution = () => {
    setShowSolution(!showSolution);
  };

  const handleEndGame = () => {
    setShowSolution(false);
    setGrid(initialGrid);
  };

  const handleCellClick = (row, col, newValue) => {
    const updatedGrid = [...grid];
    updatedGrid[row][col] = newValue;
    setGrid(updatedGrid);

    axios
      .post("http://localhost:3001/api/update-grid", { grid: updatedGrid })
      .then((response) => {
        if (response.data.success) {
          if (response.data.isComplete) {
            alert("Congratulations! You solved the Sudoku puzzle!");
          } else if (!response.data.isValid) {
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
    <>
      <Typography variant="h3" sx={{ textAlign: "center", m: 5 }}>
        Sudoku Game
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <SudokuGrid
          grid={showSolution ? completeGrid : grid}
          handleCellClick={handleCellClick}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 3,
            width: 300,
            mr: 30,
          }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={handleCheckSolution}
          >
            {showSolution ? "Hide Solution" : "Check Solution"}
          </Button>
          <Button variant="contained" color="secondary" onClick={handleEndGame}>
            End Game
          </Button>{" "}
          <Timer />
        </Box>
      </Box>
    </>
  );
}

export default App;
