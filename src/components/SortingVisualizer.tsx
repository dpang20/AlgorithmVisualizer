import React, { useState } from "react";
import ArrayBarComponent, { ArrayBar } from "./ArrayBar";
import { bubbleSort } from "../algorithms/bubbleSort";
import { quickSort } from "../algorithms/quickSort";
import { mergeSort } from "../algorithms/mergeSort";
import "../styles/SortingVisualizer.css";

const SortingVisualizer: React.FC = () => {
  // Initialize the state with ArrayBar objects
  const [array, setArray] = useState<ArrayBar[]>([
    { value: 50, isHighlighted: false, isSelected: false },
    { value: 20, isHighlighted: false, isSelected: false },
    { value: 30, isHighlighted: false, isSelected: false },
    { value: 120, isHighlighted: false, isSelected: false },
    { value: 55, isHighlighted: false, isSelected: false },
    { value: 60, isHighlighted: false, isSelected: false },
    { value: 90, isHighlighted: false, isSelected: false },
    { value: 50, isHighlighted: false, isSelected: false },
    { value: 70, isHighlighted: false, isSelected: false },
  ]);

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
    <div className="container">
      <div className="controls">
        <button onClick={generateArray}>Generate Array</button>
        <button onClick={resetArray}>Reset</button>
      </div>

      <div className="array-container">
        {array.map((bar, index) => (
          <ArrayBarComponent key={index} bar={bar} />
        ))}
      </div>

      <div className="controls">
        <button onClick={handleBubbleSort}>Bubble Sort</button>
        <button onClick={handleQuickSort}>Quick Sort</button>
        <button onClick={handleMergeSort}>Merge Sort</button>
      </div>
    </div>
  );
};

export default SortingVisualizer;
