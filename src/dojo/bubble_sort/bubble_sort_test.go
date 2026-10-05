package bubblesort_test

import (
	"testing"

	"github.com/stretchr/testify/require"

	bubblesort "programming-fundamentals/src/dojo/bubble_sort"
)

func TestBubbleSort(t *testing.T) {
	tests := []struct {
		name     string
		input    []int
		expected []int
	}{
		{name: "unsorted numbers", input: []int{3, 1, 2}, expected: []int{1, 2, 3}},
		{name: "empty slice", input: []int{}, expected: []int{}},
		{name: "nil slice", input: nil, expected: nil},
		{name: "one number", input: []int{7}, expected: []int{7}},
		{name: "sorted numbers", input: []int{1, 2, 3}, expected: []int{1, 2, 3}},
		{name: "reverse order", input: []int{3, 2, 1}, expected: []int{1, 2, 3}},
		{name: "duplicates and negatives", input: []int{2, -1, 2, 0}, expected: []int{-1, 0, 2, 2}},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			require.Equal(t, tt.expected, bubblesort.BubbleSort(tt.input))
		})
	}
}

func TestBubbleSortLeavesInputUnchanged(t *testing.T) {
	input := []int{3, 1, 2}

	result := bubblesort.BubbleSort(input)
	result[0] = 99

	require.Equal(t, []int{3, 1, 2}, input)
}
