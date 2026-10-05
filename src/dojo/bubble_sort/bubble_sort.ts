export function bubbleSort(input: readonly number[]): number[] {
  const result = [...input];

  for (let end = result.length - 1; end > 0; end--) {
    for (let index = 0; index < end; index++) {
      const left = result[index]!;
      const right = result[index + 1]!;
      if (left > right) {
        result[index] = right;
        result[index + 1] = left;
      }
    }
  }

  return result;
}
