import React, { useState } from "react";
import ArrayBarComponent, { ArrayBar } from "./ArrayBar";
import { bubbleSort } from "../algorithms/bubbleSort";
import { quickSort } from "../algorithms/quickSort";
import "../styles/SortingVisualizer.css";

const SortingVisualizer: React.FC = () => {
  // Initialize the state with ArrayBar objects
  const [array, setArray] = useState<ArrayBar[]>([]);

  const generateArray = () => {
    const newArray: ArrayBar[] = [];
    for (let i = 0; i < 20; i++) {
      newArray.push({
        value: Math.floor(Math.random() * 100) + 10,
        isHighlighted: false,
        isSelected: false,
      });
    }

    setArray(newArray);
  };

  const handleBubbleSort = () => {
    bubbleSort([...array], setArray);
  };

  const handleQuickSort = () => {
    // TODO: implement quicksort visualization
    quickSort([...array], setArray);
  };

  return (
    <div>
      <h1>Algorithm Visualizer</h1>
      <div className="array-container">
        {array.map((bar, index) => (
          <ArrayBarComponent key={index} bar={bar} />
        ))}
      </div>
      <button onClick={handleBubbleSort}>Bubble Sort</button>
      <button onClick={handleQuickSort}>Quick Sort</button>
      <button onClick={generateArray}>Randomize</button>
    </div>
  );
};

export default SortingVisualizer;
