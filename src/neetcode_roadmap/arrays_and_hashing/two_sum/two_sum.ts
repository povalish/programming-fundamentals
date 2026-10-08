// Two Sum
// https://neetcode.io/problems/two-integer-sum/question?list=neetcode250
//
// Time Complexity: O(n)
// Space Complexity: O(n)
//

export function twoSum(nums: number[], target: number): number[] {
  const cache: Record<number, number> = {}; // value, index

  for (let i = 0; i < nums.length; i++) {
    const prevValue = target - nums[i]!;
    if (cache[prevValue] !== undefined) {
      return [cache[prevValue], i];
    }

    cache[nums[i]!] = i;
  }

  return [-1, -1];
}
