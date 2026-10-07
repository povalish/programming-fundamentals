package validanagram

import (
	"testing"

	"github.com/stretchr/testify/require"
)

func Test_isAnagram(t *testing.T) {
	tests := []struct {
		name string
		s    string
		t    string
		want bool
	}{
		{name: "should return false if character's length is different", s: "aa", t: "a", want: false},
		{name: "should return true if strings are equal", s: "aa", t: "aa", want: true},
		{name: "should return false if strings are equal but different contain characters", s: "ab", t: "aa", want: false},
		{name: "should return true if strings are anagmas", s: "racecar", t: "carrace", want: true},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			require.Equal(t, tt.want, isAnagram(tt.s, tt.t))
		})
	}
}

//

func Benchmark_isAnagram(b *testing.B) {
	s := "racecar"
	t := "carrace"

	b.ReportAllocs()

	for b.Loop() {
		isAnagram(s, t)
	}
}
