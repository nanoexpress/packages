import { suite, add, cycle, complete } from 'benny';
import FindMyWay from 'find-my-way';
import { RegExpRouter } from 'hono/router/reg-exp-router';
import { CallbackNode, RootNode } from './nodes.ts';
import {
  match_route,
  lookup_route,
  build_route
} from '../../fast-route/index.ts';

const root = new RootNode('/');
const foo = new CallbackNode('GET', () => ({ foo: '1' }), 'foo');

root.push(foo);
root.optimize(['method', 'callback']);

const route = FindMyWay({
  defaultRoute(req, res) {
    return false;
  }
});
route.on('GET', '/foo', (req, res, params) => () => {});

const honoRouteRegEx = new RegExpRouter<Function>();
honoRouteRegEx.add('GET', '/foo', () => {});

const routes = [build_route('GET', '/foo', () => {})];
const route_match = match_route<(...args: any[]) => any>(...routes);
const route_lookup = lookup_route<(...args: any[]) => any>(...routes);

suite(
  'match static',
  add('node tree match', () => {
    root.match('/foo');
  }),
  add('route_build match', () => {
    route_match('GET', '/foo');
  }),
  add('hono regex match', () => {
    honoRouteRegEx.match('GET', '/foo');
  }),
  add('find-my-way', () => {
    route.find('GET', '/foo');
  }),
  cycle(),
  complete()
);

suite(
  'parse static',
  add('node tree parse', () => {
    root.parse('/foo');
  }),
  add('hono regex parse', () => {
    const [res] = honoRouteRegEx.match('GET', '/foo');

    res[0][1];
  }),
  add('find-my-way', () => {
    route.find('GET', '/foo');
  }),
  cycle(),
  complete()
);

suite(
  'lookup static',
  add('node tree lookup', () => {
    root.lookup('GET', '/foo');
  }),
  add('route_build lookup', () => {
    route_lookup('GET', '/foo');
  }),
  add('hono regex lookup', () => {
    const [res] = honoRouteRegEx.match('GET', '/foo');
    const [callback, params] = res[0];

    callback(params);
  }),
  add('find-my-way', () => {
    // @ts-expect-error
    route.lookup({ method: 'GET', url: '/foo' }, {});
  }),
  cycle(),
  complete()
);
