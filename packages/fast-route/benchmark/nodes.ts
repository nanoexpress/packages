import { Node } from 'fast-node-parse';
import { Compactify } from 'fast-node-parse/utils/compact';
import type { HttpMethod } from '../types';

export class CallbackNode extends Node {
  method: HttpMethod;
  callback: (params: Record<string, string>) => Record<string, string>;
  constructor(
    method: HttpMethod,
    handler: (params: Record<string, string>) => Record<string, string>,
    segment: string
  ) {
    super(segment);

    this.method = method;
    this.callback = handler;
  }
}
export class RootNode extends Compactify {
  // @ts-expect-error
  lookup(method: HttpMethod, path: string): false;
  // @ts-expect-error
  lookup(method: HttpMethod, path: string) {
    const result = super.lookup(path) as false | CallbackNode;

    if (!result) {
      return false;
    }

    if (result.method === method) {
      return result.callback(this.parse(path));
    }

    return false;
  }
}
