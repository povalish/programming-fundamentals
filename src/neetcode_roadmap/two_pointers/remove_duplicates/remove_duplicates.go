// Remove Duplicates From Sorted Array
// https://neetcode.io/problems/remove-duplicates-from-sorted-array/question?list=neetcode250
//
// Time Complexity: O(n)
// Space Complexity: O(1)
//

package removeduplicates

//
//

func RemoveDuplicates(nums []int) int {
	if len(nums) == 1 {
		return 1
	}

	pForward := 1
	pBackward := 1

	for pForward < len(nums) {
		if nums[pBackward-1] != nums[pForward] {
			nums[pBackward] = nums[pForward]
			pBackward++
		}

		pForward++
	}

	return pBackward
}
