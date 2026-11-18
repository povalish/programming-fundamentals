// Valid Palindrome
// https://neetcode.io/problems/is-palindrome/question?list=neetcode250
//
// Time Complexity: O(n)
// Space Complexity: O(1)

package ispalindrome

import (
	"strings"
	"unicode"
)

//
//

func IsPalindrome(str string) bool {
	if len(str) == 0 {
		return false
	}

	cleanStr := GetAlphanumericLowerString(str)

	leftPointer := 0
	rightPointer := len(cleanStr) - 1

	for leftPointer < rightPointer {
		if cleanStr[leftPointer] != cleanStr[rightPointer] {
			return false
		}

		leftPointer++
		rightPointer--
	}

	return true
}

//

func GetAlphanumericLowerString(str string) string {
	return strings.Map(func(r rune) rune {
		if (r >= 'a' && r <= 'z') ||
			(r >= 'A' && r <= 'Z') ||
			(r >= '0' && r <= '9') {
			return unicode.ToLower(r)
		}
		return -1
	}, str)
}
