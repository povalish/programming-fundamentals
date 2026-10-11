// Longest Common Prefix
// https://neetcode.io/problems/longest-common-prefix/question?list=neetcode250
//
// Time Complexity: O(n * logn)
// Space Complexity: O(n)
//

package longestcommonprefix

import "sort"

//
//

func longestCommonPrefix(strs []string) string {
	if len(strs) == 1 {
		return strs[0]
	}

	sort.Strings(strs)

	firstStr := strs[0]
	lastStr := strs[len(strs)-1]
	minLen := min(len(firstStr), len(lastStr))

	for i := range minLen {
		if firstStr[i] != lastStr[i] {
			return firstStr[:i]
		}
	}

	return strs[0]
}
