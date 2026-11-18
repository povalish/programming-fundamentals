export type Node<T> = {
  value: T;
  prev?: Node<T> | undefined;
  next?: Node<T> | undefined;
};
