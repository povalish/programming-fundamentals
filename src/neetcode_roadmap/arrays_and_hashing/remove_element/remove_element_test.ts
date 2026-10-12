import { removeElement } from "./remove_element";

//
//

describe("Remove Element", () => {
  it("should return 3 as new array's length without vals", () => {
    const nums = [1, 2, 1, 1, 3, 4];
    const val = 1;

    const newLength = removeElement(nums, val);

    expect(newLength).toEqual(3);
  });

  it("should move all elements !== val at the start of the array", () => {
    const nums = [1, 2, 1, 1, 3, 4];
    const val = 1;

    removeElement(nums, val);

    expect(nums[0]).toEqual(2);
    expect(nums[1]).toEqual(3);
    expect(nums[2]).toEqual(4);
  });

  it("should pass neetcode case #1", () => {
    const nums = [3, 2, 2, 3];
    const val = 2;

    const newLength = removeElement(nums, val);

    expect(nums[0]).toEqual(3);
    expect(nums[1]).toEqual(3);
    expect(newLength).toEqual(2);
  });

  it("should pass neetcode case #2", () => {
    const nums = [0, 1, 2, 2, 3, 0, 4, 2];
    const val = 2;

    const newLength = removeElement(nums, val);

    expect(nums[0]).toEqual(0);
    expect(nums[1]).toEqual(1);
    expect(nums[2]).toEqual(3);
    expect(nums[3]).toEqual(0);
    expect(nums[4]).toEqual(4);

    expect(newLength).toEqual(5);
  });

  it("Benchmark: removeElement()", async ({ bench }) => {
    const nums = [0, 1, 2, 2, 3, 0, 4, 2];
    const val = 2;
    const refFn = removeElement;

    await bench("run", () => refFn(nums, val)).run();
  });
});
