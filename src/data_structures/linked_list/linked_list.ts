import type { Node } from "./node";

//
//

export class LinkedList<T> {
  private _size: number = 0;
  private _head?: Node<T>;
  private _tail?: Node<T>;

  constructor() {}

  /**
   * Add new element at the front of list.
   * @param element - New element to add at the list.
   */
  public pushFront(element: T): Node<T> {
    if (this._size === 0) {
      this.addFirstElement(element);
      this._size++;
      return this._head!;
    }

    const node: Node<T> = { value: element, next: this._head };
    this._head!.prev = node;
    this._head = node;

    this._size++;

    return this._head;
  }

  /**
   * Insert new element and returns new inserted node.
   *
   * @param element - New element.
   * @param node - Node of the list.
   * @returns New inserted node.
   */
  public insertAfter(element: T, node: Node<T>): Node<T> {
    // 8 <- 9 (current node) <- X (new node) <- 10 (next node)

    const nextNode = node.next;
    const newNode: Node<T> = { prev: node, value: element, next: nextNode };

    nextNode!.prev = newNode;
    node.next = newNode;

    this._size++;

    return newNode;
  }

  public insertBefore(element: T, node: Node<T>): Node<T> {
    // 8 (prev node) <- X (new node) <- 9 (current node) <- 10

    const prevNode = node.prev;
    const newNode = { prev: prevNode, value: element, next: node };

    prevNode!.next = newNode;
    node.prev = newNode;

    this._size++;

    return newNode;
  }

  // Add new element at the end of the list
  //
  public pushBack(element: T): Node<T> {
    if (this._size === 0) {
      this.addFirstElement(element);
      this._size++;
      return this._tail!;
    }

    const node: Node<T> = { prev: this._tail, value: element };
    this._tail!.next = node;
    this._tail = node;

    this._size++;

    return this._tail;
  }

  // Returns head's element otherwise null.
  //
  public front(): Node<T> | null {
    if (this._size === 0 || !this._head) return null;
    return this._head;
  }

  // Returns tail's element otherwise null.
  //
  public back(): Node<T> | null {
    if (this._size === 0 || !this._tail) return null;
    return this._tail;
  }

  // Returns size of list's nodes.
  //
  public size(): number {
    return this._size;
  }

  // Returns string representation of linked list
  //
  public printFront(): string {
    if (!this._head) return "";

    const elements: T[] = [];
    let pointer: Node<T> | null = this._head;

    while (pointer !== null) {
      elements.push(pointer.value);
      pointer = pointer.next ?? null;
    }

    return elements.join(" <- ");
  }

  public printBack(): string {
    if (!this._tail) return "";

    const elements: T[] = [];
    let pointer: Node<T> | null = this._tail;

    while (pointer !== null) {
      elements.push(pointer.value);
      pointer = pointer.prev ?? null;
    }

    return elements.join(" -> ");
  }

  // Utilities
  //

  private addFirstElement(element: T) {
    const node: Node<T> = { value: element };
    this._head = node;
    this._tail = node;
  }
}
