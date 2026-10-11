package groupanagrams

import (
	"slices"
	"testing"

	"github.com/stretchr/testify/require"
)

func Test_groupAnagram(t *testing.T) {
	tests := []struct {
		name string
		strs []string
		want [][]string
	}{
		{
			name: "should return group of anagrams",
			strs: []string{"act", "pots", "tops", "cat", "stop", "hat"},
			want: [][]string{
				{"hat"},
				{"act", "cat"},
				{"stop", "pots", "tops"},
			},
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			got := groupAnagrams(tt.strs)
			for _, group := range got {
				slices.Sort(group)
			}
			for _, group := range tt.want {
				slices.Sort(group)
			}
			require.ElementsMatch(t, tt.want, got)
		})
	}
}

func Benchmark_groupAnagram(b *testing.B) {
	strs := []string{"act", "pots", "tops", "cat", "stop", "hat"}

	b.ReportAllocs()

	for b.Loop() {
		groupAnagrams(strs)
	}
}
