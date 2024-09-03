import React from "react";

export type ArrayBar = {
  value: number;
  isHighlighted: boolean;
  isSelected: boolean;
};

interface ArrayBarProps {
  bar: ArrayBar;
}

const ArrayBarComponent: React.FC<ArrayBarProps> = ({ bar }) => {
  const barStyle = {
    height: `${bar.value}px`,
    backgroundColor: bar.isSelected
      ? "red"
      : bar.isHighlighted
      ? "green"
      : "turquoise",
    width: "20px",
    margin: "0 2px",
    display: "inline-block",
    transition: "height 0.3s ease, background-color 0.3s ease",
  };

  return <div style={barStyle}></div>;
};

export default ArrayBarComponent;
