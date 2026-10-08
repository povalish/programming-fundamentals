// Two Sum
// https://neetcode.io/problems/two-integer-sum/question
//
// Time Complexity: O(n)
// Space Complexity: O(n)
//

package twosum

func twoSum(nums []int, target int) []int {
	cache := make(map[int]int)

	for index, value := range nums {
		prevValue := target - value
		prevIndex, ok := cache[prevValue]

		if ok {
			return []int{prevIndex, index}
		}

		cache[value] = index
	}

	return []int{-1, -1}
}
