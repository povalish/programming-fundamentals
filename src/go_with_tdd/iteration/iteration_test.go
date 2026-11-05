package iteration

import "testing"

//
//

func TestRepeat(t *testing.T) {
	t.Run("repeate string 5 times", func(t *testing.T) {
		got := Repeat("a", 5)
		want := "aaaaa"

		if got != want {
			t.Errorf("got %q but got %q", got, want)
		}
	})

	t.Run("repeate string 10 times", func(t *testing.T) {
		got := Repeat("b", 10)
		want := "bbbbbbbbbb"

		if got != want {
			t.Errorf("got %q but got %q", got, want)
		}
	})
}

func BenchmarkRepeat(b *testing.B) {
	for b.Loop() {
		Repeat("a", 10)
	}
}
