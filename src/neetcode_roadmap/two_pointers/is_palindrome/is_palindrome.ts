// Valid Palindrome
// https://neetcode.io/problems/is-palindrome/question?list=neetcode250
//
// Time Complexity: O(n)
// Space Complexity: O(1)

export function isPalindrome(s: string): boolean {
  if (s.length === 0) return false;

  let leftPointer = 0;
  let rightPointer = s.length - 1;

  while (leftPointer < rightPointer) {
    while (!isAlphanumCharacter(s[leftPointer]!) && leftPointer < rightPointer) leftPointer++;
    while (!isAlphanumCharacter(s[rightPointer]!) && leftPointer < rightPointer) rightPointer--;

    if (s[leftPointer]!.toLowerCase() !== s[rightPointer]!.toLowerCase()) return false;

    leftPointer++;
    rightPointer--;
  }

  return true;
}

//

export function isAlphanumCharacter(char: string): boolean {
  const isLowercaseChar = char >= 'a' && char <= 'z';
  const isUppercaseChar = char >= 'A' && char <= 'Z';
  const isNumber = char >= '0' && char <= '9';
  return isLowercaseChar || isUppercaseChar || isNumber;
}
