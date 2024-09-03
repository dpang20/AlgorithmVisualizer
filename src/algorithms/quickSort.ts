import { ArrayBar } from "../components/ArrayBar";

function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function medianOfThree(array: ArrayBar[], low: number, high: number): number {
    const mid = Math.floor((low + high) / 2);
    if (array[low].value > array[mid].value) [array[low], array[mid]] = [array[mid], array[low]];
    if (array[low].value > array[high].value) [array[low], array[high]] = [array[high], array[low]];
    if (array[mid].value > array[high].value) [array[mid], array[high]] = [array[high], array[mid]];
    return mid;
}
async function partition(array: ArrayBar[], low: number, high: number, updateArray: (arr: ArrayBar[]) => void): Promise<number> {
    // Reset all highlights and selections
    for (let i = 0; i < array.length; i++) {
        array[i].isSelected = false;
        array[i].isHighlighted = false;
    }

    const pivotIndex = medianOfThree(array, low, high);
    const pivotValue = array[pivotIndex].value;
    [array[pivotIndex], array[high]] = [array[high], array[pivotIndex]]; // Move pivot to end
    array[high].isSelected = true;  // Highlight pivot as red
    updateArray([...array]);
    await sleep(125);

    let i = low;
    let j = high - 1;

    while (true) {
        while (i <= j && array[i].value <= pivotValue) i++;  // Handle equal values properly
        while (i <= j && array[j].value > pivotValue) j--;

        if (i >= j) break;

        [array[i], array[j]] = [array[j], array[i]];
        array[i].isHighlighted = true; // Highlight the selected index
        array[j].isHighlighted = true;
        updateArray([...array]);
        await sleep(125);

        array[i].isHighlighted = false; // Unhighlight after swap
        array[j].isHighlighted = false;
        updateArray([...array]);
        await sleep(125);
    }

    [array[i], array[high]] = [array[high], array[i]]; // Swap pivot to its correct place
    array[i].isSelected = false;  // Unhighlight pivot
    updateArray([...array]);
    await sleep(125);

    return i;
}


export async function quickSort(array: ArrayBar[], low: number, high: number, updateArray: (arr: ArrayBar[]) => void) {
    console.log(array)
    while (low < high) {
        const pivotIndex = await partition(array, low, high, updateArray);
        if (pivotIndex - low < high - pivotIndex) {
            await quickSort(array, low, pivotIndex - 1, updateArray);
            low = pivotIndex + 1;
        } else {
            await quickSort(array, pivotIndex + 1, high, updateArray);
            high = pivotIndex - 1;
        }
    }
}
