// Reverse String
// https://neetcode.io/problems/reverse-string/question
//
// Time Complexity: O(n)
// Space Complexity: O(1)

package reversestring

//
//

func ReverseString(s []byte) []byte {
	leftPointer := 0
	rightPointer := len(s) - 1

	for leftPointer < rightPointer {
		s[leftPointer], s[rightPointer] = s[rightPointer], s[leftPointer]
		leftPointer++
		rightPointer--
	}

	return nil
}
