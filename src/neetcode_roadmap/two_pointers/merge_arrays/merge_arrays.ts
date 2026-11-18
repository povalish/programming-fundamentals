// Merge Sorted Array
// https://neetcode.io/problems/merge-sorted-array/question?list=neetcode250
//
// Time Complexity: O(n)
// Space Complexity: O(1)
//

export function merge(nums1: number[], m: number, nums2: number[], n: number): void {
  if (n === 0 && m === 0) return;

  let pLast = m + n - 1;
  let pNums1 = m - 1;
  let pNums2 = n - 1;

  while (pNums2 >= 0) {
    if (pNums1 >= 0 && nums1[pNums1]! > nums2[pNums2]!) {
      nums1[pLast--] = nums1[pNums1--]!;
    } else {
      nums1[pLast--] = nums2[pNums2--]!;
    }
  }
}
