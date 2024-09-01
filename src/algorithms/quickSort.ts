type StackElement = {
    start: number;
    end: number;
};

export const quickSort = (array: number[], updateArray: (arr: number[]) => void) => {
    const arrayBars = document.getElementsByClassName("array-bar") as HTMLCollectionOf<HTMLElement>;
    let delay = 0;

    const stack: StackElement[] = [];
    stack.push({ start: 0, end: array.length - 1 });

    while (stack.length > 0) {
        const { start, end } = stack.pop()!;
        if (start >= end) continue;

        const pivotIndex = partition(array, start, end, arrayBars, delay, updateArray);
        
        // Push right side to stack first so the left side is processed first (LIFO order)
        stack.push({ start: start, end: pivotIndex - 1 });
        stack.push({ start: pivotIndex + 1, end: end });

        // Increment delay to control the animation speed
        delay += (end - start + 1) * 50;
    }

    // Final update to ensure the last state is reflected
    setTimeout(() => {
        updateArray([...array]);
    }, delay);
};

function partition(
    array: number[],
    start: number,
    end: number,
    arrayBars: HTMLCollectionOf<HTMLElement>,
    delay: number,
    updateArray: (arr: number[]) => void
): number {
    const pivotValue = array[end];
    let pivotIndex = start;

    for (let i = start; i < end; i++) {
        setTimeout(() => {
            highlightComparison(arrayBars, i, end);
        }, delay);

        delay += 50;

        if (array[i] < pivotValue) {
            [array[i], array[pivotIndex]] = [array[pivotIndex], array[i]]; // Swap
            setTimeout(() => {
                swapHeights(arrayBars, i, pivotIndex);
                updateArray([...array]);
            }, delay);

            pivotIndex++;
        }

        delay += 50;

        setTimeout(() => {
            resetComparison(arrayBars, i, end);
        }, delay);
    }

    // Move pivot to its correct position
    [array[pivotIndex], array[end]] = [array[end], array[pivotIndex]];
    setTimeout(() => {
        swapHeights(arrayBars, pivotIndex, end);
        updateArray([...array]);
    }, delay);

    return pivotIndex;
}

// Utility functions
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

export default quickSort;
