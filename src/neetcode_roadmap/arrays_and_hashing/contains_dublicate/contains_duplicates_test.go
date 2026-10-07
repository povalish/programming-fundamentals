package containsdublicate

import (
	"math/rand"
	"testing"

	"github.com/stretchr/testify/require"
)

func Test_hasDuplicate(t *testing.T) {
	tests := []struct {
		name string
		nums []int
		want bool
	}{
		{name: "should return true if contains duplicates", nums: []int{1, 2, 1}, want: true},
		{name: "should return false without duplicates", nums: []int{1, 2, 3}, want: false},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			require.Equal(t, tt.want, hasDuplicate(tt.nums))
		})
	}
}

func Benchmark_hasDuplicate(b *testing.B) {
	rng := rand.New(rand.NewSource(52))

	// Prepare data
	//

	numsWithoutDuplicates := rng.Perm(1_000)
	numsWithDuplicates := make([]int, len(numsWithoutDuplicates))
	copy(numsWithDuplicates, numsWithoutDuplicates)

	// Shulffle duplicates
	//

	for i := 10; i < len(numsWithDuplicates); i *= 10 {
		numsWithDuplicates[i] = numsWithDuplicates[i-9]
	}

	rng.Shuffle(len(numsWithDuplicates), func(i, j int) {
		numsWithDuplicates[i], numsWithDuplicates[j] = numsWithDuplicates[j], numsWithDuplicates[i]
	})

	// Table tests
	//

	tests := []struct {
		name string
		nums []int
	}{
		{name: "numbers without duplicates", nums: numsWithoutDuplicates},
		{name: "numbers with duplicates", nums: numsWithDuplicates},
	}

	for _, tt := range tests {
		b.Run(tt.name, func(b *testing.B) {
			b.ReportAllocs()
			b.ResetTimer()

			for b.Loop() {
				hasDuplicate(tt.nums)
			}
		})
	}
}
