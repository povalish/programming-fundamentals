package helloworld

import (
	"testing"
)

//
//

func TestHello(t *testing.T) {
	t.Run("saying hello to you", func(t *testing.T) {
		got := Hello("Nikita", "")
		want := "Hello, Nikita!"
		assertCorrectMessage(t, got, want)
	})

	t.Run("say 'Hello, World' when an empty string is supplied", func(t *testing.T) {
		got := Hello("", "")
		want := "Hello, World!"
		assertCorrectMessage(t, got, want)
	})

	t.Run("say hello in Russian", func(t *testing.T) {
		got := Hello("Никита", "Russian")
		want := "Привет, Никита!"
		assertCorrectMessage(t, got, want)
	})

	t.Run("say hello Italian", func(t *testing.T) {
		got := Hello("La Nikita", "Italian")
		want := "Ciao, La Nikita!"
		assertCorrectMessage(t, got, want)
	})
}

// Utilities
//

func assertCorrectMessage(t testing.TB, got, want string) {
	t.Helper()

	if got != want {
		t.Errorf("get %q want %q", got, want)
	}
}
