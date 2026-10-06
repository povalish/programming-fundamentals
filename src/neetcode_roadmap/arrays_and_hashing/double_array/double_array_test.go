package doublearray

import (
	"testing"

	"github.com/stretchr/testify/require"
)

func Test_getConcatenation(t *testing.T) {
	tests := []struct {
		name string
		nums []int
		want []int
	}{
		{name: "should return doubled array", nums: []int{1, 2, 3}, want: []int{1, 2, 3, 1, 2, 3}},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			require.Equal(t, tt.want, getConcatenation(tt.nums))
		})
	}
}

//

func Benchmark_getConcatenation(b *testing.B) {
	nums := make([]int, 1_000)
	for i := range nums {
		nums[i] = i
	}

	b.ReportAllocs()

	for b.Loop() {
		getConcatenation(nums)
	}
}
