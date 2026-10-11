// Longest Common Prefix
// https://neetcode.io/problems/longest-common-prefix/question?list=neetcode250
//
// Time Complexity: O(n * logn)
// Space Complexity: O(n)
//

export function longestCommonPrefix(strs: string[]): string {
  if (strs.length === 1) return strs[0]!;

  const sorted = strs.toSorted();

  const firstStr = sorted[0]!;
  const lastStr = sorted[sorted.length - 1]!;
  const minLength = Math.min(firstStr.length, lastStr.length);

  for (let i = 0; i < minLength; i++) {
    if (firstStr[i] !== lastStr[i]) {
      return firstStr.slice(0, i);
    };
  }

  return firstStr;
}
