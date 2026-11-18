import { Stack } from "./stack";

//
//

describe("Stack", () => {
  it("should push/pop/view element", () => {
    const stack = new Stack<number>();

    expect(stack.top()).toEqual(null);
    expect(stack.isEmpty()).toEqual(true);
    expect(stack.size()).toEqual(0);

    stack.push(10);
    stack.top();
    expect(stack.top()).toEqual(10);
    expect(stack.isEmpty()).toEqual(false);
    expect(stack.size()).toEqual(1);

    stack.push(11);
    expect(stack.size()).toEqual(2);
    expect(stack.top()).toEqual(11);

    let poppedElement = stack.pop();
    expect(poppedElement).toEqual(11);

    // View last element after pop
    expect(stack.top()).toEqual(10);

    poppedElement = stack.pop();
    expect(poppedElement).toEqual(10);

    // Now stack is empty
    expect(stack.isEmpty()).toEqual(true);
    expect(stack.top()).toEqual(null);
    expect(stack.pop()).toEqual(null);
    expect(stack.size()).toEqual(0);
  });

  it("should clear stack", () => {
    const stack = new Stack<number>();

    stack.push(1);
    stack.push(2);
    stack.push(3);
    expect(stack.size()).toEqual(3);

    stack.clear();
    expect(stack.size()).toEqual(0);
  });
});
