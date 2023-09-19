import React from "react";

function Cell({ value, onChange }) {
  const handleChange = (e) => {
    const newValue = parseInt(e.target.value, 10);
    onChange(newValue);
  };

  return (
    <input
      type="number"
      min="1"
      max="9"
      className="sudoku-cell"
      value={value === 0 ? "" : value}
      onChange={handleChange}
      sx={{ width: 50, height: 50 }}
    />
  );
}

export default Cell;
