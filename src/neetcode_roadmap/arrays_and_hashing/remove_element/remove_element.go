// Remove Element
// https://neetcode.io/problems/remove-element/question
//
// Time Complexity: O(n)
// Space Complexity: O(1)
//

package removeelement

//

func removeElement(nums []int, val int) int {
	leftPointer := 0
	rightPointer := 0

	for rightPointer < len(nums) {
		for nums[rightPointer] == val {
			rightPointer++

			if rightPointer >= len(nums) {
				return leftPointer
			}
		}

		nums[leftPointer] = nums[rightPointer]
		leftPointer++
		rightPointer++
	}

	return leftPointer
}
