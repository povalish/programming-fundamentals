import { expect, test } from "vitest";
import { bubbleSort } from "./bubble_sort";

test.each([
  { name: "unsorted numbers", input: [3, 1, 2], expected: [1, 2, 3] },
  { name: "empty array", input: [], expected: [] },
  { name: "one number", input: [7], expected: [7] },
  { name: "sorted numbers", input: [1, 2, 3], expected: [1, 2, 3] },
  { name: "reverse order", input: [3, 2, 1], expected: [1, 2, 3] },
  { name: "duplicates and negatives", input: [2, -1, 2, 0], expected: [-1, 0, 2, 2] },
])("sorts $name", ({ input, expected }) => {
  expect(bubbleSort(input)).toEqual(expected);
});

test("leaves the input unchanged", () => {
  const input = [3, 1, 2];

  const result = bubbleSort(input);

  expect(input).toEqual([3, 1, 2]);
  expect(result).not.toBe(input);
});
