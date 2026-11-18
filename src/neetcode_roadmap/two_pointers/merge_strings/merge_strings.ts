// Merge Strings Alternately
// https://neetcode.io/problems/merge-strings-alternately/question?list=neetcode250
//
// Time Complexity: O(n+k)
// Space Complexity: O(n+k)
//

export function mergeAlternately(word1: string, word2: string): string {
  if (word1.length === 0 && word2.length === 0) {
    return "";
  }

  if (word1.length === 0) return word2;
  if (word2.length === 0) return word1;

  let pWord1 = 0;
  let pWord2 = 0;
  let result = "";

  while (pWord1 < word1.length || pWord2 < word2.length) {
    if (pWord1 < word1.length) result += word1[pWord1];
    if (pWord2 < word2.length) result += word2[pWord2];

    pWord1 = Math.min(pWord1 + 1, word1.length);
    pWord2 = Math.min(pWord2 + 1, word2.length);
  }

  return result;
}
