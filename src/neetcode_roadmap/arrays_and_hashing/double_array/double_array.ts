// oxlint-disable unicorn/no-new-array

/*
  Concatenation of Array
  https://neetcode.io/problems/concatenation-of-array/question?list=neetcode250

  Time Complexity: O(n)
  Space Complexity: O(n)
*/

export function getConcatenation(nums: number[]): number[] {
  const result: number[] = new Array(nums.length * 2);

  for (let i = 0; i < nums.length; i++) {
    result[i] = nums[i]!;
    result[i + nums.length] = nums[i]!;
  }

  return result;
}
