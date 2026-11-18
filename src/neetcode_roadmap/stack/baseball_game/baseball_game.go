// Baseball Game
// https://neetcode.io/problems/baseball-game/question?list=neetcode250
//
// Time Complexity: O(n)
// Space Complexity: O(n)
//

package baseballgame

import (
	"strconv"
)

//
//

func CalPoints(operations []string) int {
	var stack []int

	for _, opt := range operations {
		var a, b int

		switch opt {
		case "+":
			b = stack[len(stack)-2]
			a = stack[len(stack)-1]
			stack = append(stack, a+b)

		case "D":
			a = stack[len(stack)-1]
			stack = append(stack, a*2)

		case "C":
			stack, _, _ = pop(stack)

		default:
			score, _ := convToNum(opt)
			stack = append(stack, score)
		}
	}

	var acc int
	for _, score := range stack {
		acc += score
	}

	return acc
}

// Utilities
//

func pop(stack []int) ([]int, int, error) {
	if len(stack) == 0 {
		return stack, 0, nil
	}

	last := stack[len(stack)-1]
	return stack[:len(stack)-1], last, nil
}

func convToNum(str string) (int, error) {
	num, err := strconv.Atoi(str)
	if err != nil {
		return 0, nil
	}

	return num, nil
}
