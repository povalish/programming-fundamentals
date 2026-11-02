package longestcommonprefix

import "testing"

//
//

func Test_longestCommonPrefix(t *testing.T) {
	tests := []struct {
		name string
		strs []string
		want string
	}{
		{name: "case #1", strs: []string{"bat", "bag", "bank", "band"}, want: "ba"},
		{name: "case #2", strs: []string{"dance", "dag", "danger", "damage"}, want: "da"},
		{name: "case #3", strs: []string{"neet", "feet"}, want: ""},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			got := longestCommonPrefix(tt.strs)
			if got != tt.want {
				t.Errorf("longestCommonPrefix() = %v, want %v", got, tt.want)
			}
		})
	}
}

func Bench_longestCommonPrefix(b *testing.B) {
	b.ReportAllocs()

	for b.Loop() {
		longestCommonPrefix([]string{"dance", "dag", "danger", "damage"})
	}
}
