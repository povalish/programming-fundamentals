import { merge } from "./merge_arrays";

//
//

describe("Merge Sorted Array", () => {
  it("should return empty array if nums1 and nums2 are empty", () => {
    const got: number[] = [];
    const want: number[] = [];

    merge(got, 0, [], 0);

    expect(got).toEqual(want);
  });

  it("should return '[1,2,3,4]' if nums1 = [1,2,0,0] and nums2 = [3,4]", () => {
    const got: number[] = [1, 2, 0, 0];
    const want: number[] = [1, 2, 3, 4];

    merge(got, 2, [3, 4], 2);

    expect(got).toEqual(want);
  });

  it("should return [1,4,6,8] if nums1 = [1,6,0,0] and nums2 = [4,8]", () => {
    const nums1 = [1, 6, 0, 0];
    const nums2 = [4, 8];

    merge(nums1, 2, nums2, 2);

    expect(nums1).toEqual([1, 4, 6, 8]);
  });

  it("should merge if all nums1 more then nums2", () => {
    const nums1 = [3, 4, 0, 0];
    const nums2 = [1, 2];

    merge(nums1, 2, nums2, 2);

    expect(nums1).toEqual([1, 2, 3, 4]);
  });

  it("should merge arrays with equal numbers", () => {
    const got: number[] = [1, 2, 0, 0];
    const want: number[] = [1, 1, 2, 2];

    merge(got, 2, [1, 2], 2);

    expect(got).toEqual(want);
  });
});

//
// [1, 4, 0, 0]
// [3, 2]
