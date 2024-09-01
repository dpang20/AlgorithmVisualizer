import React from "react";
import "../styles/SortingVisualizer.css";

interface Props {
  value: number;
  index: number;
}

const ArrayBar = ({ value, index }: Props) => {
  return (
    <div
      className="array-bar"
      style={{
        height: `${value * 10}px`,
        width: `20px`,
        backgroundColor: "turquoise",
        margin: "0 2px",
      }}
    ></div>
  );
};

export default ArrayBar;
