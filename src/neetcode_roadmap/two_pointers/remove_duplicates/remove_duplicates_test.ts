import { removeDuplicates } from "./remove_duplicates";

//
//

describe("Remove Duplicates From Sorted Array", () => {
  it("should return 1 if arrays is [1]", () => {
    const nums = [1];
    const want = 1;

    const got = removeDuplicates(nums);

    expect(got).toEqual(want);
    expect(nums).toEqual([1]);
  });

  it("should return 4 if arrays is [1,1,2,3,4]", () => {
    const nums = [1, 1, 2, 3, 4];
    const want = 4;

    const got = removeDuplicates(nums);

    expect(got).toEqual(want);
    expect(nums).toEqual([1, 2, 3, 4, 4]);
  });

  it("should return 3 if arrays is [2,10,10,30,30,30]", () => {
    const nums = [2, 10, 10, 30, 30, 30];
    const want = 3;

    const got = removeDuplicates(nums);

    expect(got).toEqual(want);
    expect(nums).toEqual([2, 10, 30, 30, 30, 30]);
  });
});
