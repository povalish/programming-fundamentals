package removeduplicates

import (
	"slices"
	"testing"
)

//
//

func TestRemoveDuplicates(t *testing.T) {
	t.Run("should return 4 if arrays is [1,1,2,3,4]", func(t *testing.T) {
		nums := []int{1, 1, 2, 3, 4}
		want := []int{1, 2, 3, 4, 4}

		unique := RemoveDuplicates(nums)

		if !slices.Equal(nums, want) || unique != 4 {
			t.Errorf("got %v want %v", nums, want)
		}
	})

	t.Run("should return 3 if arrays is [2,10,10,30,30,30]", func(t *testing.T) {
		nums := []int{2, 10, 10, 30, 30, 30}
		want := []int{2, 10, 30, 30, 30, 30}

		unique := RemoveDuplicates(nums)

		if !slices.Equal(nums, want) || unique != 3 {
			t.Errorf("got %v want %v", nums, want)
		}
	})
}
