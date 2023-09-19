import React from "react";
import Grid from "@mui/material/Grid";
import Cell from "./Cell";

function SudokuGrid({ grid, handleCellClick }) {
  return (
    <Grid container>
      {grid.map((row, rowIndex) => (
        <Grid container item key={rowIndex} justifyContent="center">
          {row.map((value, colIndex) => (
            <Cell
              key={colIndex}
              value={value}
              onChange={() => handleCellClick(rowIndex, colIndex)}
            />
          ))}
        </Grid>
      ))}
    </Grid>
  );
}

export default SudokuGrid;
