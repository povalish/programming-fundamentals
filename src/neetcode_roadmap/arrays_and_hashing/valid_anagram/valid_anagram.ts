// Valid Anagram
// https://neetcode.io/problems/is-anagram/question?list=neetcode250
//
// Time Complexity: O(n)
// Space Complexity: O(1)
//

export function isAnagram(s: string, t: string): boolean {
  if (s.length !== t.length) return false;

  const alphabet = new Array(26).fill(0);

  for (let i = 0; i < s.length; i++) {
    alphabet[s.charCodeAt(i) - 'a'.charCodeAt(0)] += 1;
    alphabet[t.charCodeAt(i) - 'a'.charCodeAt(0)] -= 1;
  }

  return alphabet.every((freq) => freq === 0);
}
