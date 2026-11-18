// Valid Parentheses
// https://neetcode.io/problems/validate-parentheses/question?list=neetcode250
//
// Time Complexity: O(n)
// Space Complexity: O(n)
//

export function isValid(s: string): boolean {
  const stack: string[] = [];
  const parentheses: Record<string, string> = { "(": ")", "[": "]", "{": "}" };

  for (let symbol of s) {
    if (parentheses[symbol]) {
      stack.push(symbol);
      continue;
    }

    const lastOpenedSymbol = stack.pop()!;
    const requiredClosedSymbol = parentheses[lastOpenedSymbol];

    if (symbol !== requiredClosedSymbol) return false;
  }

  return stack.length === 0;
}
