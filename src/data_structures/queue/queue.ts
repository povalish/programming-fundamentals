export class Queue<T> {
  private data: T[] = [];

  constructor() {}

  // Adds the element to the back of the queue
  //
  public enqueue(element: T): void {
    this.data.push(element);
  }

  // Returns the element at the front of the queue without removing it
  //
  public peak(): T | null {
    if (this.data.length === 0) return null;
    return this.data[0] ?? null;
  }

  // Returns true if the stack is empty, false otherwise
  //
  public isEmpty(): boolean {
    return this.data.length === 0;
  }
}
