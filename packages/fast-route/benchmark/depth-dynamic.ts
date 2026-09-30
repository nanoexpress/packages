import { suite, add, cycle, complete } from 'benny';
import { Node } from 'fast-node-parse';
import FindMyWay from 'find-my-way';
import { RegExpRouter } from 'hono/router/reg-exp-router';
import { CallbackNode, RootNode } from './nodes.ts';
import {
  build_route,
  lookup_route,
  match_route
} from '../../fast-route/index.ts';

const root = new RootNode('/');
const foo = new Node('foo');
const id = new Node(':id');
const kind = new CallbackNode(
  'GET',
  (params) => ({
    id: params.id,
    [params.kind]: '1'
  }),
  ':kind'
);

id.push(kind);
foo.push(id);
root.push(foo);

root.optimize(['method', 'callback']);

const route = FindMyWay({
  defaultRoute(req, res) {
    return false;
  }
});
route.on('GET', '/foo/:id/:kind', (req, res, params) => ({
  id: params.id,
  // @ts-expect-error
  [params.kind]: 1
}));

const honoRouteRegEx = new RegExpRouter<Function>();
honoRouteRegEx.add(
  'GET',
  '/foo/:id/:kind',
  (params: Record<string, string>) => ({
    id: params.id,
    [params.kind]: 1
  })
);

const routes = [
  build_route('GET', '/foo/:id/:kind', () => ({ id: 123, bar: 1 }))
];
const route_match = match_route<(...args: any[]) => any>(...routes);
const route_lookup = lookup_route<(...args: any[]) => any>(...routes);

suite(
  'match',
  add('node tree match', () => {
    root.match('/foo/123/bar');
  }),
  add('route_build match', () => {
    route_match('GET', '/foo/123/bar');
  }),
  add('hono regex match', () => {
    honoRouteRegEx.match('GET', '/foo/123/bar');
  }),
  add('find-my-way', () => {
    route.find('GET', '/foo/123/bar');
  }),
  cycle(),
  complete()
);

suite(
  'parse',
  add('node tree parse', () => {
    root.parse('/foo/123/bar');
  }),
  add('hono regex parse', () => {
    const [res] = honoRouteRegEx.match('GET', '/foo/123/bar');

    res[0][1];
  }),
  add('find-my-way', () => {
    route.find('GET', '/foo/123/bar');
  }),
  cycle(),
  complete()
);

suite(
  'lookup',
  add('node tree lookup', () => {
    root.lookup('GET', '/foo/123/bar');
  }),
  add('route_build lookup', () => {
    route_lookup('GET', '/foo/123/bar');
  }),
  add('hono regex lookup', () => {
    const [res] = honoRouteRegEx.match('GET', '/foo/123/bar');

    res[0][0](res[0][1]);
  }),
  add('find-my-way', () => {
    // @ts-expect-error
    route.lookup({ method: 'GET', url: '/foo/123/bar' }, {});
  }),
  cycle(),
  complete()
);
