package bubblesort

import "slices"

func BubbleSort(input []int) []int {
	result := slices.Clone(input)
	for end := len(result) - 1; end > 0; end-- {
		for index := 0; index < end; index++ {
			if result[index] > result[index+1] {
				result[index], result[index+1] = result[index+1], result[index]
			}
		}
	}

	return result
}
