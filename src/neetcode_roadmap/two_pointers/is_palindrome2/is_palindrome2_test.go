package ispalindrome2

import "testing"

//
//

func TestIsPalindrome(t *testing.T) {
	t.Run("strings playground", func(t *testing.T) {
		str := "12345"
		if str[0:1] != "1" {
			t.Error("No!")
		}
	})

	t.Run("should return `false` for empty string", func(t *testing.T) {
		got := IsPalindrome("")
		want := false

		assertEquals(t, want, got)
	})

	t.Run("should return `true` if valid palindrome", func(t *testing.T) {
		got := IsPalindrome("aba")
		want := true
		assertEquals(t, want, got)

		got = IsPalindrome("abaca")
		want = false
		assertEquals(t, want, got)
	})

	t.Run("should reuturn `true` if only 1 incorrect character", func(t *testing.T) {
		got := IsPalindrome("abac")
		want := true
		assertEquals(t, want, got)

		got = IsPalindrome("abbda")
		want = true
		assertEquals(t, want, got)
	})

	t.Run("should return `false` if 2 or more incorrect characters", func(t *testing.T) {
		got := IsPalindrome("abbadc")
		want := false
		assertEquals(t, want, got)
	})
}

// Utilities
//

func assertEquals(t *testing.T, want, got bool) {
	t.Helper()

	if got != want {
		t.Errorf("want %v got %v", want, got)
	}
}
