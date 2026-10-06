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

  it("**capture performance", () => {
    const array: number[] = Array(1_000).fill(Date.now());
    const iterations = 100;

    // Warmup
    for (let i = 0; i <= 100; i++) {
      getConcatenation(array);
    }

    const start = performance.now();
    for (let i = 0; i < 100; i++) {
      getConcatenation(array);
    }
    const elapsed = performance.now() - start;

    console.log({
      elements: array.length,
      iterations,
      ttlMs: elapsed.toFixed(2) + "ms",
      avgMs: (elapsed / iterations).toFixed(3) + "ms",
    });
  });
});
