import { isAnagram } from "./valid_anagram";

//
//

describe("Valid Anagram", () => {
  it("should return boolean", () => {
    const result = isAnagram("aa", "aa");
    expect(typeof result === "boolean").toEqual(true);
  });

  it("should return false if character's length is different", () => {
    const result = isAnagram("aaa", "aa");
    expect(result).toEqual(false);
  });

  it("should return true is strings are equal", () => {
    const result = isAnagram("aa", "aa");
    expect(result).toEqual(true);
  });

  it("should return false if equal strings but different characters", () => {
    const result = isAnagram("ab", "aa");
    expect(result).toEqual(false);
  });

  it("should return true if strings are anagrams", () => {
    const result = isAnagram("abcd", "bcda");
    expect(result).toEqual(true);
  });

  it("Benchmark: isAnagram", async ({ bench }) => {
    const s = "racecar";
    const t = "carrace";
    const fnRef = isAnagram;

    await bench("fixed strings run", () => fnRef(s, t)).run();
  });
});
