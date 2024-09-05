import { suite, add, cycle, complete } from 'benny';
import { Node } from '../src/tree.ts';
import FindMyWay from 'find-my-way';

const root = new Node('/').push([
  new Node('foo').push([
    new Node(':id').push([
      new Node('bar', () => ({ bar: 1 })),
      new Node('baz', () => ({ baz: 1 }))
    ])
  ])
]);
const route = FindMyWay({
  defaultRoute(req, res) {
    return false;
  }
});
route.on('GET', '/foo/:id/bar', () => ({ bar: 1 }));
route.on('GET', '/foo/:id/baz', () => ({ baz: 1 }));

const match = (url: string) => {
  return (
    url.indexOf('foo') === 1 &&
    url.substring(5, 8) === '123' &&
    url.indexOf('bar') !== -1
  );
};

suite(
  'Node Match',
  add('node tree', () => {
    root.match('/foo/123/bar');
  }),
  add('node tree w/ handler', () => {
    root.match('/foo/123/bar', true);
  }),
  add('match map', () => {
    match('/foo/:id/bar');
  }),
  add('find-my-way', () => {
    // @ts-expect-error
    route.lookup({ method: 'GET', url: '/foo/123/bar' }, {});
  }),
  cycle(),
  complete()
);
