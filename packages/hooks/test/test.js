import { useCallback, useEffect, useMemo, wrap } from '../src/ne-hook.js';
import { test } from './assert-context.js';

await test(async (ctx) => {
  ctx.expectCount(3);
  ctx.expectGlobalCount(31);

  const RenderComponent = () =>
    wrap(() => {
      const expensive = useMemo(() => {
        return 1 + 2 + 3;
      }, []);
      ctx.equal(expensive, 6, 'Memoize should return correct value');

      return useCallback(() => expensive, []);
    });

  // TEST IT FOR WORKING EXAMPLE
  const callback = RenderComponent();
  async function generateComponent() {
    ctx.resetCount();
    const rendered = RenderComponent();

    // Test memoize function
    ctx.strictEqual(callback, rendered);

    // Test memoized function result
    ctx.strictEqual(callback(), rendered());
  }

  await Promise.all(Array(10).fill(null).map(generateComponent));
});
