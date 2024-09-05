import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { Node } from '../src/tree.ts';

describe('route matches', async () => {
  const root = new Node('/').push([
    new Node('foo').push([
      new Node(':id').push([new Node('bar'), new Node('baz')])
    ])
  ]);

  await it('matched route', () => {
    assert.equal(root.match('/foo/123/bar'), true, 'Common cases');
    assert.equal(root.match('/foo/123/baz'), true, 'Common cases');
    assert.equal(
      root.match('/foo/123/bloof'),
      false,
      'Common cases w/ unmatched route'
    );
  });
  await it('unmatched route', () => {
    assert.equal(root.match('/foo/123'), false, 'Unmatched route');
    assert.equal(root.match('/foo/bar'), false, 'Unmatched route w/ collision');
    assert.equal(root.match('/foo/'), false, 'Unmatched route');
  });
});

describe('route matches w/ handler', async () => {
  const root = new Node('/').push([
    new Node('foo').push([
      new Node(':id').push([
        new Node('bar', (params) => ({ id: params.id, bar: 1 })),
        new Node('baz', (params) => ({ id: params.id, baz: 1 }))
      ])
    ])
  ]);

  await it('matched route w/ handler', () => {
    assert.deepStrictEqual(
      root.match('/foo/123/bar', true),
      { id: '123', bar: 1 },
      'Common cases w/ handler'
    );
    assert.deepStrictEqual(
      root.match('/foo/123/baz', true),
      { id: '123', baz: 1 },
      'Common cases w/ handler'
    );
    assert.equal(
      root.match('/foo/123/bloof'),
      false,
      'Common cases w/ unmatched route'
    );
  });
  await it('unmatched route', () => {
    assert.equal(root.match('/foo/123'), false, 'Unmatched route');
    assert.equal(root.match('/foo/bar'), false, 'Unmatched route w/ collision');
    assert.equal(root.match('/foo/'), false, 'Unmatched route');
  });
});
