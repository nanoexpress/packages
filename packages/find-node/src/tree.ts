/**
 * It is maybe looks like **binary tree**
 * but it is different algorithm was made
 * to solve the walking on routers linearly
 * so it should fast on any size of route
 */
export class Node<TResponse> {
  private _prev: Node<TResponse> | null;
  private _next: Node<TResponse>[];
  private _root: Node<TResponse>;
  private _end: boolean;
  private _handler?: (...args: any[]) => TResponse;
  private _params: Record<string, string>;
  position: number;
  segment: string;
  static: boolean;
  length: number;
  totalLength: number;

  key: string | null;
  value: string | null;

  constructor(
    segment: string,
    handler?: (...args: any[]) => TResponse,
    params: Record<string, string> = {}
  ) {
    this._prev = null;
    this._next = [];
    this._root = this;
    this._end = true;
    this.position = 0;

    this.segment = segment;
    this.static = !/[<>:*]/.test(segment);
    this.length = this.static ? segment.length : 2;
    this.totalLength = this.length;
    this._handler = handler;

    // This need for routers, otherwise you can modify it
    // or remove it, add something, do whatever you want
    this._params = params;
    this.key = this.static
      ? null
      : segment === '*'
        ? '*'
        : segment.charAt(0) === ':'
          ? segment.substring(1)
          : segment;
    this.value = null;
  }
  push(nodes: Node<TResponse>[]) {
    const addLength = Math.min(...nodes.map((node) => node.totalLength));

    for (const node of nodes) {
      node.position += this.length + 1;
      node._prev = this;
      node._root = this._root;
    }

    this._next = nodes;
    this.totalLength += addLength;

    return this;
  }
  match(path: string): boolean;
  match<TMatchResponse = TResponse>(
    path: string,
    runCallback?: true
  ): TMatchResponse;
  match<TMatchResponse = TResponse>(path: string, runCallback?: false): boolean;
  match(path: string, runCallback?: boolean) {
    let i = -1;
    let lastIndex = 0;
    let node: Node<TResponse> = this;
    let nodes: Node<TResponse>[] = node._next;

    while (node._next.length) {
      const nodesIndex = node.position + i;

      for (node of nodes) {
        if (node.static) {
          i = path.indexOf(node.segment, nodesIndex);
        } else {
          i = path.indexOf('/', nodesIndex);

          if (runCallback && node.key) {
            this._params[node.key] = path.substring(lastIndex, i);
          }
        }

        if (i !== -1) {
          lastIndex = i;
          break;
        }
      }

      if (i === -1) {
        return false;
      }

      nodes = node._next;
    }

    if (!node._end) {
      return false;
    }

    if (runCallback && node._handler) {
      return node._handler(this._params);
    }

    return true;
  }
}
