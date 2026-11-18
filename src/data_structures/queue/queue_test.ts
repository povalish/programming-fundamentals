import { Queue } from "./queue";

//
//

describe("Queue", () => {
  it("should enqueue/dequeue/peak elements", () => {
    const queue = new Queue<number>();

    expect(queue.isEmpty()).toEqual(true);
    expect(queue.peak()).toEqual(null);

    queue.enqueue(10);
    expect(queue.peak()).toEqual(10);

    queue.enqueue(11);
    expect(queue.peak()).toEqual(10);
  });
});
