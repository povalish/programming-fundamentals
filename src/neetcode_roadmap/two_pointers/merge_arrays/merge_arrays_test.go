package mergearrays

import (
	"slices"
	"testing"
)

//
//

func TestMerge(t *testing.T) {
	t.Run("should merged sorted arrays: case #1", func(t *testing.T) {
		got := []int{1, 2, 3, 0, 0, 0}
		want := []int{1, 2, 2, 3, 5, 6}

		Merge(got, 3, []int{2, 5, 6}, 3)

		if !slices.Equal(got, want) {
			t.Errorf("got %v want %v", got, want)
		}
	})

	t.Run("should merged sorted arrays: case #2", func(t *testing.T) {
		nusm1 := []int{2, 2, 3, 0, 0, 0}
		nums2 := []int{1, 5, 6}
		want := []int{1, 2, 2, 3, 5, 6}

		Merge(nusm1, 3, nums2, 3)

		if !slices.Equal(nusm1, want) {
			t.Errorf("got %v want %v", nusm1, want)
		}
	})
}
