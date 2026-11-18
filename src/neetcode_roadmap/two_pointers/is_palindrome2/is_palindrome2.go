// Valid Palindrome II
// https://neetcode.io/problems/valid-palindrome-ii/question?list=neetcode250
//
// Time Complexity: O(n)
// Space Complexity: O(1)

package ispalindrome2

//
//

func IsPalindrome(s string) bool {
	if len(s) == 0 {
		return false
	}

	pLeft := 0
	pRight := len(s) - 1

	for pLeft < pRight {
		if s[pLeft] != s[pRight] {
			isLeftSubstrPalindrome := isPalindromeSubstr(s[pLeft:pRight])
			isRightSubstrPalindrome := isPalindromeSubstr(s[pLeft+1 : pRight+1])
			return isLeftSubstrPalindrome || isRightSubstrPalindrome
		}

		pLeft++
		pRight--
	}

	return true
}

//

func isPalindromeSubstr(s string) bool {
	if len(s) == 0 {
		return false
	}

	pLeft := 0
	pRight := len(s) - 1

	for pLeft < pRight {
		if s[pLeft] != s[pRight] {
			return false
		}

		pLeft++
		pRight--
	}

	return true
}
