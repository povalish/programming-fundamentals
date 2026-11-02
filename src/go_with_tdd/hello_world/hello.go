package helloworld

import (
	"fmt"
)

//
//

func main() {
	fmt.Println(Hello("Nikita", ""))
}

//
//

const (
	helloENPrefix = "Hello, "
	helloRUPrefix = "Привет, "
	helloITPrefix = "Ciao, "

	postfix = "!"

	russian = "Russian"
	italian = "Italian"
)

//

func Hello(name, language string) string {
	if name == "" {
		name = "World"
	}

	return getPrefix(language) + name + postfix
}

//

func getPrefix(language string) (prefix string) {
	switch language {
	case russian:
		prefix = helloRUPrefix
	case italian:
		prefix = helloITPrefix
	default:
		prefix = helloENPrefix
	}

	return
}
