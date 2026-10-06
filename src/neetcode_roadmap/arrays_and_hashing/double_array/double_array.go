// Concatenation of Array
// https://neetcode.io/problems/concatenation-of-array/question
//
// Time Complexity: O(n)
// Space Complexity: O(n)
//

package doublearray

func getConcatenation(nums []int) []int {
	length := len(nums)
	result := make([]int, length*2)

	for i, num := range nums {
		result[i] = num
		result[i+length] = num
	}

	return result
}
