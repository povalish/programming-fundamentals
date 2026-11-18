// Remove Duplicates From Sorted Array
// https://neetcode.io/problems/remove-duplicates-from-sorted-array/question?list=neetcode250
//
// Time Complexity: O(n)
// Space Complexity: O(1)
//

export function removeDuplicates(nums: number[]): number {
  if (nums.length === 1) return 1;

  let pForward = 1;
  let pBackward = 0;

  while (pForward < nums.length) {
    while (nums[pBackward] === nums[pForward]) {
      pForward++;

      if (pForward == nums.length) return pBackward + 1;
    }

    if (nums[pBackward] !== nums[pForward]) {
      pBackward++;
      nums[pBackward] = nums[pForward]!;
      pForward++;
    }
  }

  return pBackward + 1;
}
