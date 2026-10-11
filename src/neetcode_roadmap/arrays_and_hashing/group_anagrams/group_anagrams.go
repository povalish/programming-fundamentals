// Group Anagrams
// https://neetcode.io/problems/anagram-groups/question
//
// Time Complexity: O(n)
// Space Complexity: O(n)
//

package groupanagrams

func groupAnagrams(strs []string) [][]string {
	groups := make(map[[26]int][]string)

	for _, str := range strs {
		var alphabet [26]int
		for _, char := range str {
			alphabet[char-'a']++
		}

		groups[alphabet] = append(groups[alphabet], str)
	}

	var result [][]string
	for _, group := range groups {
		result = append(result, group)
	}

	return result
}

// hash
// act
