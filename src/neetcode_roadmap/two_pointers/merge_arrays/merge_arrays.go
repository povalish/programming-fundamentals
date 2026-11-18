// Merge Sorted Array
// https://neetcode.io/problems/merge-sorted-array/question
//
// Time Complexity: O(n)
// Space Complexity: O(1)
//

package mergearrays

//
//

func Merge(nums1 []int, m int, nums2 []int, n int) {
	pNums1 := m - 1
	pNums2 := n - 1
	pLast := len(nums1) - 1

	for pNums2 >= 0 {
		if pNums1 >= 0 && nums1[pNums1] >= nums2[pNums2] {
			nums1[pLast] = nums1[pNums1]
			pLast--
			pNums1--
		} else {
			nums1[pLast] = nums2[pNums2]
			pLast--
			pNums2--
		}
	}
}
