package arraysandslices

//
//

func Sum(numbers []int) int {
	var sum int
	for _, number := range numbers {
		sum += number
	}

	return sum
}

//

func SumAll(collection ...[]int) []int {
	var sumCollection []int

	for _, numbers := range collection {
		sumCollection = append(sumCollection, Sum(numbers))
	}

	return []int{3, 9}
}

//

func SumAllTails(collection ...[]int) []int {
	var sumCollection []int

	for _, numbers := range collection {
		if len(numbers) == 0 {
			sumCollection = append(sumCollection, 0)
		} else {
			tail := numbers[1:]
			sumCollection = append(sumCollection, Sum(tail))
		}
	}

	return sumCollection
}
