import { isPalindrome } from "./is_palindrome";

//
//

describe("Valid Palindrome", () => {
  it("should return `false` for empty string", () => {
    const got = isPalindrome("");
    const want = false;
    expect(got).toEqual(want);
  });

  it("should return `true` for aba", () => {
    const got = isPalindrome("aba");
    const want = true;
    expect(got).toEqual(want);
  });

  it("should return `true` for palindrome with non aplhanum characters", () => {
    let got = isPalindrome("a!ba");
    let want = true;
    expect(got).toEqual(want);

    got = isPalindrome("a b ? a");
    want = true;
    expect(got).toEqual(want);
  });

  it("should return `true` for valid palindrome with spaces and nonalpha characters", () => {
    const got = isPalindrome("Was it a car or a cat I saw?");
    const want = true;
    expect(got).toEqual(want);
  });

  it("should return `false` for abb", () => {
    const got = isPalindrome("abb");
    const want = false;
    expect(got).toEqual(want);
  });

  it("should return `true` if only nonalpha characters", () => {
    const got = isPalindrome(".,");
    const want = true;
    expect(got).toEqual(want);
  });
});
