import React from "react";

function ColorIcon({ item, onClick, className }) {
  return (
    <i
      style={{ backgroundColor: item.color }}
      onClick={onClick}
      className={className}
    ></i>
  );
}

export default ColorIcon;
