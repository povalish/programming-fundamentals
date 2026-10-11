import { longestCommonPrefix } from "./longest_common_prefix";

//
//

describe("Longest Common Prefix", () => {
  describe("TDD", () => {
    it("should return string if lenght is 1", () => {
      const result = longestCommonPrefix(["xyz"]);
      expect(result).toEqual("xyz");
    });

    it("should return `x` for ['xx', 'xy']", () => {
      const result = longestCommonPrefix(["xx", "xy"]);
      expect(result).toEqual("x");
    });

    it("should return `x` for all array elements", () => {
      const result = longestCommonPrefix(["xx", "xxy", "xyz"]);
      expect(result).toEqual("x");
    });

    it("should return `xy` for all array elements", () => {
      const result = longestCommonPrefix(["xy", "xyy", "xyz"]);
      expect(result).toEqual("xy");
    });
  });

  describe("Target tsts", () => {
    it("should pass basic cases", () => {
      let result = longestCommonPrefix(["bat", "bag", "bank", "band"]);
      expect(result).toEqual("ba");

      result = longestCommonPrefix(["dance", "dag", "danger", "damage"]);
      expect(result).toEqual("da");

      result = longestCommonPrefix(["neet", "feet"]);
      expect(result).toEqual("");
    });
  });

  it("Benchmark: longestCommonPrefix()", async ({ bench }) => {
    const fnRef = longestCommonPrefix;
    await bench("run", () => fnRef(["dance", "dag", "danger", "damage"])).run();
  });
});
