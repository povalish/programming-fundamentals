// Contains Duplicate
// https://neetcode.io/problems/duplicate-integer/question?list=neetcode250
//
// Time Complexity: O(n)
// Space Complexity: O(n)
//

package containsdublicate

func hasDuplicate(nums []int) bool {
	unique := make(map[int]bool, len(nums))

	for _, num := range nums {
		isExists := unique[num]

		if isExists == true {
			return true
		}

		unique[num] = true
	}

	return false
}
