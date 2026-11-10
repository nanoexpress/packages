import { describe, expect, spyOn, test } from 'bun:test';
import FindMyWay from 'find-my-way';

describe('fast_js_route', () => {
  test('package entrypoint exposes router helpers', async () => {
    // The route modules log sample matches at import time.
    const log = spyOn(console, 'log').mockImplementation(() => {});
    const api = await import('./index.ts');
    log.mockRestore();

    expect(api.build_route).toBeFunction();
    expect(api.build_layer).toBeFunction();
    expect(api.match_route).toBeFunction();
    expect(api.lookup_route).toBeFunction();
  });

  test('find-my-way still matches parameter routes', () => {
    const router = FindMyWay();
    const handler = () => 'ok';

    router.on('GET', '/foo/:id', handler);

    expect(router.find('GET', '/foo/123')?.handler).toBe(handler);
  });
});
