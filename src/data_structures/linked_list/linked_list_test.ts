import { LinkedList } from "./linked_list";

//
//

describe("Linked List", () => {
  it("should add elements at the front of the list", () => {
    const list = new LinkedList<number>();

    expect(list.size()).toEqual(0);
    expect(list.front()).toEqual(null);
    expect(list.back()).toEqual(null);
    expect(list.printFront()).toEqual('');

    list.pushFront(10);
    expect(list.front()).toHaveProperty("value", 10);
    expect(list.size()).toEqual(1);
    expect(list.front()).toHaveProperty("value", 10);
    expect(list.back()).toHaveProperty("value", 10);

    let node = list.pushFront(9);
    list.pushFront(8);
    expect(list.size()).toEqual(3);
    expect(list.front()).toHaveProperty("value", 8);
    expect(list.back()).toHaveProperty("value", 10);

    expect(list.printFront()).toEqual("8 <- 9 <- 10");
    expect(list.printBack()).toEqual("10 -> 9 -> 8");

    list.insertAfter(99, node);
    expect(list.printFront()).toEqual("8 <- 9 <- 99 <- 10");
    expect(list.printBack()).toEqual("10 -> 99 -> 9 -> 8");
  });

  it("should add elements at the end of the list", () => {
    const list = new LinkedList<number>();

    expect(list.size()).toEqual(0);
    expect(list.front()).toEqual(null);
    expect(list.back()).toEqual(null);
    expect(list.printFront()).toEqual('');

    list.pushBack(100);
    expect(list.size()).toEqual(1);
    expect(list.front()).toHaveProperty("value", 100);
    expect(list.back()).toHaveProperty("value", 100);

    const node = list.pushBack(101);
    list.pushBack(102);
    expect(list.size()).toEqual(3);
    expect(list.back()).toHaveProperty("value", 102);
    expect(list.front()).toHaveProperty("value", 100);

    expect(list.printFront()).toEqual('100 <- 101 <- 102');
    expect(list.printBack()).toEqual('102 -> 101 -> 100');

    list.insertBefore(1010, node);
    expect(list.printFront()).toEqual('100 <- 1010 <- 101 <- 102');
    expect(list.printBack()).toEqual('102 -> 101 -> 1010 -> 100');
  });
});
