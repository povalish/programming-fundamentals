// Contains Duplicate
// https://neetcode.io/problems/duplicate-integer/question?list=neetcode250
//
// Time Complexity: O(n)
// Space Complexity: O(n)
//

export function hasDuplicate(nums: number[]): boolean {
  const unique = new Map<number, boolean>();

  for (let i = 0; i < nums.length; i++) {
    if (unique.has(nums[i]!)) return true;
    unique.set(nums[i]!, true);
  }

  return false;
}
