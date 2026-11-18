import { isValid } from "./valid_parentheses";

//
//

describe("Valid Parentheses", () => {
  it("should return `true` if s = '[]'", () => {
    const s = "[]";
    const got = isValid(s);
    const want = true;

    expect(got).toEqual(want);
  });

  it("should pass cases", () => {
    let s = "([{}])";
    let got = isValid(s);
    let want = true;
    expect(got).toEqual(want);

    s = "[(])";
    got = isValid(s);
    want = false;
    expect(got).toEqual(want);
  });
});
