// Remove Element
// https://neetcode.io/problems/remove-element/question?list=neetcode250
//
// Time Complexity: O(n)
// Space Complexity: O(1)
//

export function removeElement(nums: number[], val: number): number {
  let leftPointer = 0;
  let rightPointer = 0;

  while (rightPointer < nums.length) {
    while (nums[rightPointer] === val) rightPointer++;
    if (rightPointer >= nums.length) break;

    nums[leftPointer] = nums[rightPointer]!;
    leftPointer++;
    rightPointer++;
  }

  return leftPointer;
}
