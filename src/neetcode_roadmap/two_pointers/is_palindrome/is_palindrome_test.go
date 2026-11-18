package ispalindrome

import "testing"

//
//

func TestIsPalindrome(t *testing.T) {
	t.Run("should return `false` for empty string", func(t *testing.T) {
		got := IsPalindrome("")
		want := false
		assertEquals(t, want, got)
	})

	t.Run("should return `true` for `aa` or `aba`", func(t *testing.T) {
		got := IsPalindrome("aa")
		want := true
		assertEquals(t, want, got)

		got = IsPalindrome("aba")
		want = true
		assertEquals(t, want, got)
	})

	t.Run("should skip spaces", func(t *testing.T) {
		got := IsPalindrome("ab a")
		want := true
		assertEquals(t, want, got)
	})

	t.Run("should pass case #1", func(t *testing.T) {
		got := IsPalindrome("Was it a car or a cat I saw?")
		want := true
		assertEquals(t, want, got)
	})
}

//

func TestGetAlphanumericLowerString(t *testing.T) {
	got := GetAlphanumericLowerString("Hello, мир! Go_1.22 #42")
	want := "hellogo12242"

	if got != want {
		t.Errorf("got %v want %v", got, want)
	}
}

// Utilities
//

func assertEquals(t *testing.T, want, got bool) {
	t.Helper()

	if got != want {
		t.Errorf("got %v want %v", got, want)
	}
}
