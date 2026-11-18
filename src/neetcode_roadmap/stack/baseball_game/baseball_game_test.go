package baseballgame

import "testing"

//
//

func TestCalPoints(t *testing.T) {
	t.Run("should return inserted number", func(t *testing.T) {
		operations := []string{"1"}
		got := CalPoints(operations)
		want := 1

		if got != want {
			t.Errorf("got %v want %v", got, want)
		}
	})

	t.Run("should pass case #1", func(t *testing.T) {
		operations := []string{"1", "2", "+", "C", "5", "D"}
		got := CalPoints(operations)
		want := 18

		if got != want {
			t.Errorf("got %v want %v", got, want)
		}
	})
}
