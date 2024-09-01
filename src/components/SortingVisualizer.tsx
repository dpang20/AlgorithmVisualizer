import React, { useState } from "react";
import ArrayBar from "./ArrayBar";
import { bubbleSort } from "../algorithms/bubbleSort";
import { quickSort } from "../algorithms/quickSort";
import "../styles/SortingVisualizer.css";

const SortingVisualizer: React.FC = () => {
  const [array, setArray] = useState<number[]>([7, 6, 5, 4, 3, 2, 1, 0]);

  const handleBubbleSort = () => {
    bubbleSort([...array], setArray);
  };

  const handleQuickSort = () => {
    quickSort([...array], setArray);
  };

  return (
    <div>
      <h1>Algorithm Visualizer</h1>
      <div className="array-container">
        {array.map((value, index) => (
          <ArrayBar key={index} value={value} index={index} />
        ))}
      </div>
      <button onClick={handleBubbleSort}>Bubble Sort</button>
      <button onClick={handleQuickSort}>Quick Sort</button>
    </div>
  );
};

export default SortingVisualizer;
