import { isPalindrome } from "./is_palindrome2";

//
//

describe("Valid Palindrome II", () => {
  it("should return `false` for empty string", () => {
    const got = isPalindrome("");
    const want = false;
    expect(got).toEqual(want);
  });

  it("should return `false` if not a palindrome", () => {
    const got = isPalindrome("abcd");
    const want = false;
    expect(got).toEqual(want);
  });

  it("should return `true` if valid palindrome", () => {
    const got = isPalindrome("abba");
    const want = true;
    expect(got).toEqual(want);
  });

  it("should return `true` if only 1 incorrect character", () => {
    let got = isPalindrome("abac");
    let want = true;
    expect(got).toEqual(want);

    got = isPalindrome("abbda");
    want = true;
    expect(got).toEqual(want);
  });

  it("should return `false` if 2 or more incorrect characters", () => {
    const got = isPalindrome("abbadc");
    const want = false;
    expect(got).toEqual(want);
  })
});
