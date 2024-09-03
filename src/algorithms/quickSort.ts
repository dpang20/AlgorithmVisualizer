import { ArrayBar } from "../components/ArrayBar";

function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function partition(
    array: ArrayBar[],
    start: number,
    end: number,
    updateArray: (arr: ArrayBar[]) => void
): Promise<number> {
    // Unmark all previous pivots
    for (let i = 0; i < array.length; i++) {
        array[i].isSelected = false;
    }

    const pivotValue = array[end].value;
    let pivotIndex = start;

    // Mark the new pivot (red)
    array[end].isSelected = true;
    updateArray([...array]);
    await sleep(125
        );

    for (let i = start; i < end; i++) {
        array[i].isHighlighted = true;
        updateArray([...array]);
        await sleep(125
            );

        if (array[i].value < pivotValue) {
            [array[i], array[pivotIndex]] = [array[pivotIndex], array[i]];
            updateArray([...array]);
            await sleep(125
                );

            pivotIndex++;
        }

        array[i].isHighlighted = false;
        updateArray([...array]);
        await sleep(125
            );
    }

    // Move the pivot to its correct position
    [array[pivotIndex], array[end]] = [array[end], array[pivotIndex]];
    array[pivotIndex].isSelected = false;
    updateArray([...array]);
    await sleep(125
        );

    return pivotIndex;
}

export async function quickSort(
    array: ArrayBar[],
    updateArray: (arr: ArrayBar[]) => void
) {
    // 
    const stack: { start: number, end: number }[] = [];
    stack.push({ start: 0, end: array.length - 1 });

    while (stack.length > 0) {
        const { start, end } = stack.pop()!;
        if (start >= end) continue;

        const pivotIndex = await partition(array, start, end, updateArray);

        stack.push({ start: start, end: pivotIndex - 1 });
        stack.push({ start: pivotIndex + 1, end: end });
    }

    // Reset all highlights and selections
    for (let i = 0; i < array.length; i++) {
        array[i].isSelected = false;
        array[i].isHighlighted = false;
    }
    updateArray([...array]);  // Update the array to reflect the final state
}
