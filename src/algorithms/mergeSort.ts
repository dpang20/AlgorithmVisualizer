import { ArrayBar } from "../components/ArrayBar";

function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function merge(
    arr: ArrayBar[],
    left: number,
    mid: number,
    right: number,
    updateArray: (arr: ArrayBar[]) => void
): Promise<void> {
    const n1 = mid - left + 1;
    const n2 = right - mid;

    // Create temp arrays
    const L: ArrayBar[] = new Array(n1);
    const R: ArrayBar[] = new Array(n2);

    // Copy data to temp arrays L[] and R[]
    for (let i = 0; i < n1; i++) {
        L[i] = arr[left + i];
        L[i].isHighlighted = true; // Highlight the left part being merged
    }
    for (let j = 0; j < n2; j++) {
        R[j] = arr[mid + 1 + j];
        R[j].isHighlighted = true; // Highlight the right part being merged
    }

    updateArray([...arr]);
    await sleep(125);

    let i = 0, j = 0;
    let k = left;

    // Merge the temp arrays back into arr[left..right]
    while (i < n1 && j < n2) {
        if (L[i].value <= R[j].value) {
            arr[k] = L[i];
            i++;
        } else {
            arr[k] = R[j];
            j++;
        }
        arr[k].isHighlighted = true; // Highlight the merged element
        updateArray([...arr]);
        await sleep(125);
        k++;
    }

    // Copy the remaining elements of L[], if there are any
    while (i < n1) {
        arr[k] = L[i];
        arr[k].isHighlighted = true;
        updateArray([...arr]);
        await sleep(125);
        i++;
        k++;
    }

    // Copy the remaining elements of R[], if there are any
    while (j < n2) {
        arr[k] = R[j];
        arr[k].isHighlighted = true;
        updateArray([...arr]);
        await sleep(125);
        j++;
        k++;
    }

    // Reset the highlights
    for (let i = left; i <= right; i++) {
        arr[i].isHighlighted = false;
    }
    updateArray([...arr]);
}

export async function mergeSort(
    arr: ArrayBar[],
    left: number,
    right: number,
    updateArray: (arr: ArrayBar[]) => void
): Promise<void> {
    if (left >= right) return;

    const mid = Math.floor(left + (right - left) / 2);
    await mergeSort(arr, left, mid, updateArray);
    await mergeSort(arr, mid + 1, right, updateArray);
    await merge(arr, left, mid, right, updateArray);
}
