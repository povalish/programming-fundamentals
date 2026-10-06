import { getConcatenation } from "./double_array";

//
//

describe("Concatenation of Array", () => {
  it("should return array", () => {
    const result = getConcatenation([1, 2, 3]);
    expect(Array.isArray(result)).toEqual(true);
  });

  it("should return doubled array", () => {
    const result = getConcatenation([1, 2, 3]);
    expect(result).toEqual([1, 2, 3, 1, 2, 3]);
  });

  it("Benchmark: getConcatenation", async ({ bench }) => {
    const nums: number[] = Array(1_000).fill(1);
    const concatenate = getConcatenation;

    await bench("1000 elements", () => concatenate(nums)).run();
  });
});
