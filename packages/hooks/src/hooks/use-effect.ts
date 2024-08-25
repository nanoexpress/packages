import { getState } from '../constants';
import isDiffers, { type Dependencies } from '../utils/is-differs';

/**
 * `useEffect` hook
 * @param fn Callback to execute as effect
 * @param dependencies Dependencies to compare
 * @example
 * ```ts
 * import { useEffect, wrap } from '@nanoexpress/hooks';
 *
 * app.get('/trace', wrap((req, res) => {
 *  useEffect(() => {
 *  // This effect will be called once
 *    logLogic.send({track: Date.now()})
 *  }, [])
 * }))
 * ```
 *
 * @description
 * * This hook works only for `sync` routes, any `async` routes will not work properly
 * * Don't forget to call `wrap` to ensure any computations will work properly
 */
const useEffect = <TFunc extends () => void>(
  fn: TFunc,
  dependencies: Dependencies
) => {
  const cache = getState();
  cache.kind = 'effect';

  if (isDiffers(cache.dependencies, dependencies)) {
    if (typeof cache.value === 'function') {
      cache.value();
    }
    cache.value = fn();
    cache.dependencies = dependencies;
  }
};
export default useEffect;
