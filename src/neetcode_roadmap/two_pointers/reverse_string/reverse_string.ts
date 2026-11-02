// Reverse String
// https://neetcode.io/problems/reverse-string/question?list=neetcode250
//
// Time Complexity: O(n)
// Space Complexity: O(1)
//

export function reverseString(s: string[]): void {
  let lPoint = 0;
  let rPoint = s.length - 1;

  while (lPoint < rPoint) {
    [s[lPoint], s[rPoint]] = [s[rPoint]!, s[lPoint]!];
    lPoint++;
    rPoint--;
  }
}
