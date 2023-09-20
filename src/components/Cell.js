import React from "react";

function Cell({ value, onChange, col, row }) {
  const handleChange = (e) => {
    const newValue = parseInt(e.target.value, 10);
    if (!isNaN(newValue) && newValue >= 1 && newValue <= 9) {
      onChange(newValue);
    }
  };

  const cellStyle = {
    width: 40,
    height: 40,
    borderBottom: "1px solid black",
    borderRight: "1px solid black",
  };

  if ((col + 1) % 3 === 0) {
    cellStyle.borderRight = "3px solid black";
  }

  if ((row + 1) % 3 === 0) {
    cellStyle.borderBottom = "3px solid black";
  }

  return (
    <input
      type="number"
      min="1"
      max="9"
      className="sudoku-cell"
      value={value === 0 ? "" : value}
      onChange={handleChange}
      style={cellStyle}
    />
  );
}

export default Cell;
