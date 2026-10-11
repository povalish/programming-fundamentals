// Group Anagrams
// https://neetcode.io/problems/anagram-groups/question?list=neetcode150
//
// Time Complexity: O(n)
// Space Complexity: O(n)
//

function getHash(str: string): string {
  const slots = new Array(26).fill(0);
  for (let character of str) {
    const index = character.charCodeAt(0) - "a".charCodeAt(0);
    slots[index]++;
  }

  return slots.join("_");
}

export function groupAnagrams(strs: string[]): string[][] {
  const result: string[][] = [];
  const buckets: Record<string, string[]> = {};

  for (let str of strs) {
    const hash = getHash(str);

    if (!buckets[hash]) buckets[hash] = [];
    buckets[hash].push(str);
  }

  for (let [_, values] of Object.entries(buckets)) {
    const subarray: string[] = [];
    for (let value of values) {
      subarray.push(value);
    }
    result.push(subarray);
  }

  return result;
}

//
//
