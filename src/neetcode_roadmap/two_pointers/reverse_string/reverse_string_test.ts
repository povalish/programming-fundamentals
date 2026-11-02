import { reverseString } from "./reverse_string";

//
//

describe("Reverse String", () => {
  it("case #1", () => {
    const s: string[] = ["n", "e", "e", "t"];
    reverseString(s);

    expect(s).toEqual(["t", "e", "e", "n"]);
  });

  it("Benchmark: reverseString()", async ({ bench }) => {
    const fnRef = reverseString;

    await bench("fresh array", () => fnRef(["n", "e", "e", "t"])).run();
  });
});
