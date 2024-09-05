import fastPathParseMatch from 'fast-path-parse/aot/match';
import fastPathParseParse from 'fast-path-parse/aot/parse';
import { EventEmitter } from 'node:events';
import { Node } from './tree';

export type HttpMethod =
  | 'GET'
  | 'HEAD'
  | 'POST'
  | 'PUT'
  | 'PATCH'
  | 'DELETE'
  | 'OPTIONS';
export class RouteEvents<THttpRequest, THttpResponse, TReturn = void> {
  #map: Map<
    string,
    {
      parse: ReturnType<typeof fastPathParseParse>;
      match: ReturnType<typeof fastPathParseMatch>;
    }
  >;
  #events: EventEmitter;
  constructor() {
    this.#map = new Map();
    this.#events = new EventEmitter();

    // Avoid memory leak
    this.#events.setMaxListeners(96);
  }
  #mapPath(path: string) {
    if (!this.#map.get(path)) {
      this.#map.set(path, {
        parse: fastPathParseParse(path),
        match: fastPathParseMatch(path)
      });
    }

    return this.#map.get(path);
  }
  on(
    methodName: HttpMethod,
    path: string,
    listener: (req: THttpRequest, res: THttpResponse) => TReturn
  ): this {
    this.#events.on(`${methodName}_${path}`, listener);

    return this;
  }
  once(
    methodName: HttpMethod,
    path: string,
    listener: (req: THttpRequest, res: THttpResponse) => TReturn
  ): this {
    this.#mapPath(path);

    this.#events.once(`${methodName}_${path}`, listener);

    return this;
  }
  off(
    methodName: HttpMethod,
    path: string,
    listener: (req: THttpRequest, res: THttpResponse) => TReturn
  ): this {
    this.#map.delete(path);

    this.#events.off(`${methodName}_${path}`, listener);

    return this;
  }
  emit(
    methodName: HttpMethod,
    path: string,
    req: THttpRequest,
    res: THttpResponse
  ): this {
    this.#events.emit(`${methodName}_${path}`, req, res);

    return this;
  }
}

const rout = new RouteEvents<Request, null, Response>();

rout.on('GET', '/', (req) => {
  return new Response(
    JSON.stringify({
      message: `GET /`,
      headers: req.headers
    })
  );
});

const root = new Node('/').push([
  new Node('foo').push([
    new Node(':id').push([
      new Node('bar', () => Response.json({ bar: 1 })),
      new Node('baz', () => Response.json({ baz: 1 }))
    ])
  ])
]);

Bun.serve({
  development: true,
  port: 4500,
  fetch(request, server) {
    const url = new URL(request.url);

    return (
      root.match<Response>(url.pathname) ||
      new Response('not found', { status: 404 })
    );
  }
});
console.log(`Listening at 4500`);
