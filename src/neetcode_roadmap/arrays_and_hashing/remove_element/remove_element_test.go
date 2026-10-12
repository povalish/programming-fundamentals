package removeelement

import "testing"

func Test_removeElement(t *testing.T) {
	tests := []struct {
		name string
		nums []int
		val  int
		want int
	}{
		{
			name: "case #1",
			nums: []int{3, 2, 2, 3},
			val:  2,
			want: 2,
		},
		{
			name: "case #2",
			nums: []int{0, 1, 2, 2, 3, 0, 4, 2},
			val:  2,
			want: 5,
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			got := removeElement(tt.nums, tt.val)
			if got != tt.want {
				t.Errorf("removeElement() = %v, want %v", got, tt.want)
			}
		})
	}
}

//

func Benchmark_removeElement(b *testing.B) {
	b.ReportAllocs()
	for b.Loop() {
		removeElement([]int{0, 1, 2, 2, 3, 0, 4, 2}, 2)
	}
}
