export const bubbleSort = (array: number[], updateArray: (arr: number[]) => void) => {
    const arrayBars = document.getElementsByClassName("array-bar") as HTMLCollectionOf<HTMLElement>;
    let delay = 0;

    for (let i = 0; i < array.length - 1; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {
            const index1 = j;
            const index2 = j + 1;

            // Schedule all operations in one continuous sequence
            setTimeout(() => {
                // Highlight the elements being compared
                highlightComparison(arrayBars, index1, index2);

                setTimeout(() => {
                    // Swap the elements in the array if needed
                    if (array[index1] > array[index2]) {
                        [array[index1], array[index2]] = [array[index2], array[index1]];
                        swapHeights(arrayBars, index1, index2);
                        updateArray([...array]);
                    }
                    
                    // Reset the color after comparison
                    resetComparison(arrayBars, index1, index2);
                }, 200);
            }, delay);

            delay += 300;  // Adjust delay to control animation speed
        }
    }

    // Ensure final array update after all operations
    setTimeout(() => {
        updateArray([...array]);
        console.log("Final sorted array:", array);
    }, delay);
};

// Utility functions remain the same
function highlightComparison(arrayBars: HTMLCollectionOf<HTMLElement>, index1: number, index2: number): void {
    arrayBars[index1].style.backgroundColor = "red";
    arrayBars[index2].style.backgroundColor = "red";
}

function resetComparison(arrayBars: HTMLCollectionOf<HTMLElement>, index1: number, index2: number): void {
    arrayBars[index1].style.backgroundColor = "turquoise";
    arrayBars[index2].style.backgroundColor = "turquoise";
}

function swapHeights(arrayBars: HTMLCollectionOf<HTMLElement>, index1: number, index2: number): void {
    const tempHeight = arrayBars[index1].style.height;
    arrayBars[index1].style.height = arrayBars[index2].style.height;
    arrayBars[index2].style.height = tempHeight;
}

export default bubbleSort;
