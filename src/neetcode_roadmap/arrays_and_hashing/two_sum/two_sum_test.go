package twosum

import (
	"testing"
)

func Test_twoSum(t *testing.T) {
	t.Run("should return exact 2 indexes", func(t *testing.T) {
		array := []int{11, 12, 13, 14}
		target := 25
		indexes := twoSum(array, target)

		if len(indexes) != 2 {
			t.Error("result has wrong len")
		}

		if indexes[0] > len(array) || indexes[1] > len(array) {
			t.Error("result is not indexes")
		}
	})

	t.Run("indexes should'nt be -1", func(t *testing.T) {
		array := []int{11, 12, 13, 14}
		target := 25
		indexes := twoSum(array, target)

		if indexes[0] == -1 || indexes[1] == -1 {
			t.Error("one of the index is -1")
		}
	})

	t.Run("sum elements should equal target", func(t *testing.T) {
		array := []int{11, 12, 13, 14}
		target := 25
		indexes := twoSum(array, target)

		if array[indexes[0]]+array[indexes[1]] != target {
			t.Error("result != target")
		}
	})
}

func Benchmark_twoSum(b *testing.B) {
	array := []int{11, 12, 13, 14}
	target := 25

	b.ReportAllocs()

	for b.Loop() {
		twoSum(array, target)
	}
}
