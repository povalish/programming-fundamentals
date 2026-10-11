import { groupAnagrams } from "./group_anagrams";

//

describe("Group Anagrams", () => {
  it("Playground: should work", () => {
    const result = groupAnagrams(["act", "pots", "tops", "cat", "stop", "hat"]);
    expect(result).toEqual([["act", "cat"], ["pots", "tops", "stop"], ["hat"]]);
  });

  it("Benchmark: groupAnagrams()", async ({ bench }) => {
    const strs = ["act", "pots", "tops", "cat", "stop", "hat"];
    const fnRef = groupAnagrams;

    await bench("groupAnagrams() run", () => fnRef(strs)).run();
  });
});
