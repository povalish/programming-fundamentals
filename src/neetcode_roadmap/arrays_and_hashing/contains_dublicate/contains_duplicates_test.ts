import { hasDuplicate } from "./contains_duplicates";

//
//

describe("Contains Duplicate", () => {
  it("should return true if contains duplicate", () => {
    const result = hasDuplicate([1, 2, 2, 2]);
    expect(result).toEqual(true);
  });

  it("should return false without duplicates", () => {
    const result = hasDuplicate([1, 2, 3]);
    expect(result).toEqual(false);
  });

  it("Benchmark: hasDuplicate", async ({ bench }) => {
    const nums: number[] = Array(1_000).fill(Date.now());
    const fnRef = hasDuplicate;

    await bench("1000 elements", () => fnRef(nums)).run();
  });
});
