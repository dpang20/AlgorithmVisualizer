import React, { useState } from "react";
import ArrayBarComponent, { ArrayBar } from "./ArrayBar";
import { bubbleSort } from "../algorithms/bubbleSort";
import { quickSort } from "../algorithms/quickSort";
import { mergeSort } from "../algorithms/mergeSort";
import "../styles/SortingVisualizer.css";

const SortingVisualizer: React.FC = () => {
  // Initialize the state with ArrayBar objects
  const [array, setArray] = useState<ArrayBar[]>([]);

  // save this array so we can reset it if user wants to
  const [savedArray, setSavedArray] = useState<ArrayBar[]>([]);

  const handleBubbleSort = () => {
    bubbleSort([...array], setArray);
  };
  const handleQuickSort = () => {
    quickSort([...array], 0, array.length - 1, setArray);
  };

  const handleMergeSort = () => {
    try {
      mergeSort([...array], 0, array.length - 1, setArray);
    } catch (error) {
      console.error("An error occurred during merge sort:", error);
    }
  };

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
    setSavedArray(newArray);
  };

  const resetArray = () => {
    setArray([...savedArray]);
  };

  return (
    <div>
      <button onClick={generateArray}>Generate Array</button>
      <button onClick={resetArray}>Reset</button>
      <div className="array-container">
        {array.map((bar, index) => (
          <ArrayBarComponent key={index} bar={bar} />
        ))}
      </div>
      <button onClick={handleBubbleSort}>Bubble Sort</button>
      <button onClick={handleQuickSort}>Quick Sort</button>
      <button onClick={handleMergeSort}>Merge Sort</button>
    </div>
  );
};

export default SortingVisualizer;
