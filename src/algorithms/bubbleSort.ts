import { ArrayBar } from "../components/ArrayBar";

export const bubbleSort = (array: ArrayBar[], updateArray: (arr: ArrayBar[]) => void) => {
    const n = array.length;
    let delay = 0;

    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            // Highlight bars being compared
            setTimeout(() => {
                array[j].isHighlighted = true;
                array[j + 1].isHighlighted = true;
                updateArray([...array]);
            }, delay);
            delay += 100;

            setTimeout(() => {
                if (array[j].value > array[j + 1].value) {
                    // Swap values
                    [array[j], array[j + 1]] = [array[j + 1], array[j]];
                    updateArray([...array]);
                }
            }, delay);
            delay += 100;

            // Reset highlighting after swap
            setTimeout(() => {
                array[j].isHighlighted = false;
                array[j + 1].isHighlighted = false;
                updateArray([...array]);
            }, delay);
            delay += 100;
        }
    }

    setTimeout(() => {
        updateArray([...array]);
    }, delay);
};
