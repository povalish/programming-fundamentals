package reversestring

import (
	"slices"
	"testing"
)

//
//

func TestReverseString(t *testing.T) {
	t.Run("should works with empty bytes", func(t *testing.T) {
		got := []byte{}
		want := []byte{}

		ReverseString(got)

		if !slices.Equal(want, got) {
			t.Errorf("got %v want %v", got, want)
		}
	})

	t.Run("should works with 1 byte", func(t *testing.T) {
		got := []byte{'n'}
		want := []byte{'n'}

		ReverseString(got)

		if !slices.Equal(want, got) {
			t.Errorf("got %v want %v", got, want)
		}
	})

	t.Run("should reverse string", func(t *testing.T) {
		got := []byte{'n', 'e', 'e', 't'}
		want := []byte{'t', 'e', 'e', 'n'}

		ReverseString(got)

		if !slices.Equal(want, got) {
			t.Errorf("got %v want %v", got, want)
		}
	})
}
