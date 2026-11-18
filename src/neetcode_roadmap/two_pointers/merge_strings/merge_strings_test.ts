import { mergeAlternately } from "./merge_strings";

//
//

describe("Merge Strings Alternately", () => {
  it("should return empty string if word1 = '' and word2 = ''", () => {
    const got = mergeAlternately("", "");
    const want = "";

    expect(got).toEqual(want);
  });

  it("should retrun merged strings of equal length", () => {
    const got = mergeAlternately("abc", "xyz");
    const want = "axbycz";

    expect(got).toEqual(want);
  });

  it("should return 'a' if word1 = 'a' and word2 = ''", () => {
    const got = mergeAlternately("a", "");
    const want = "a";

    expect(got).toEqual(want);
  });

  it("should return 'aabbbxxc' if word1 = 'ab' and word2 = 'abbxxc'", () => {
    const got = mergeAlternately("ab", "abbxxc");
    const want = "aabbbxxc";

    expect(got).toEqual(want);
  })
});
