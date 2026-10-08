import { twoSum } from "./two_sum";

//
//

describe("Two Sum", () => {
  it("should return array", () => {
    const result = twoSum([1, 2], 0);

    expect(Array.isArray(result)).toEqual(true);
  });

  it("should return 2 numbers", () => {
    const [index1, index2] = twoSum([1, 2, 3], 5);

    expect(typeof index1 === "number").toEqual(true);
    expect(typeof index2 === "number").toEqual(true);
  });

  it("should return exact 2 indexes", () => {
    const [index1, index2, index3] = twoSum([1, 2, 3, 4], 5);

    expect(index1).toBeDefined();
    expect(index2).toBeDefined();
    expect(index3).not.toBeDefined();
  });

  it("should return only indexes", () => {
    const array = [11, 12, 13, 14];
    const result = twoSum(array, 5);

    for (let index of result) {
      expect(index < array.length).toBe(true);
    }
  });

  it("should not be the same index", () => {
    const [index1, index2] = twoSum([1, 2, 3, 4], 5);
    expect(index1 !== index2).toBeTruthy();
  });

  it("should return sum of 2 elements === target", () => {
    const array = [11, 12, 13, 14];
    const target = 25;
    const [index1, index2] = twoSum(array, target);

    expect(array[index1!]! + array[index2!]!).toEqual(target);
  });

  it("Benchmark: twoSum()", async ({ bench }) => {
    const array = [11, 12, 13, 14];
    const target = 27;
    const fnRef = twoSum;

    await bench("small array run", () => fnRef(array, target)).run();
  });
});
