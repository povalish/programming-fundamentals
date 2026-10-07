// Valid Anagram
// https://neetcode.io/problems/is-anagram/question
//
// Time Complexity: O(n)
// Space Complexity: O(1)
//

package validanagram

func isAnagram(s, t string) bool {
	if len(s) != len(t) {
		return false
	}

	var alphabet [26]int

	for i := 0; i < len(s); i++ {
		alphabet[s[i]-'a'] += 1
		alphabet[t[i]-'a'] -= 1
	}

	for _, freq := range alphabet {
		if freq != 0 {
			return false
		}
	}

	return true
}
