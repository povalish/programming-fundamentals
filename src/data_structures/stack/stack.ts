export class Stack<T> {
  private data: T[] = [];

  constructor() {}

  // Pushes element x to the top of the stack
  //
  public push(element: T): void {
    this.data.push(element);
  }

  // Removes the element on the top of the stack and returns it
  //
  public pop(): T | null {
    return this.data.pop() ?? null;
  }

  // Returns the element on the top of the stack
  //
  public top(): T | null {
    if (this.data.length === 0) return null;
    return this.data[this.data.length - 1] ?? null;
  }

  // Returns true if the stack is empty, false otherwise
  //
  public isEmpty(): boolean {
    return this.data.length === 0;
  }

  // Returns size of the stack.
  //
  public size(): number {
    return this.data.length;
  }

  // Clear all stack data.
  //
  public clear(): void {
    this.data = [];
  }
}
