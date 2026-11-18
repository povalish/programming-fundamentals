// Valid Palindrome II
// https://neetcode.io/problems/valid-palindrome-ii/question?list=neetcode250
//
// Time Complexity: O(n)
// Space Complexity: O(1)
//

export function isPalindrome(s: string): boolean {
  if (s.length == 0) return false;

  let pLeft = 0;
  let pRight = s.length - 1;

  while (pLeft < pRight) {
    if (s[pLeft] !== s[pRight]) {
      return (
        isPalindromeSubstr(s.substring(pLeft, pRight)) ||
        isPalindromeSubstr(s.substring(pLeft + 1, pRight + 1))
      );
    }

    pLeft++;
    pRight--;
  }

  return true;
}

export function isPalindromeSubstr(s: string): boolean {
  if (s.length === 0) return false;

  let pLeft = 0;
  let pRight = s.length - 1;

  while (pLeft < pRight) {
    if (s[pLeft] !== s[pRight]) {
      return false;
    }

    pLeft++;
    pRight--;
  }

  return true;
}
