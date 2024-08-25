import { getState } from '../constants';
import isDiffers, { type Dependencies } from '../utils/is-differs';

/**
 * `useCallback` hook
 * @param fn Callback to memoize
 * @param dependencies Dependencies to compare
 * @returns Memoized function which keeps state between requests
 * @example
 * ```ts
 * import { useCallback, wrap } from '@nanoexpress/hooks';
 *
 * app.get('/trace', wrap((req, res) => {
 *  // This callback will be cached and no new function will be created
 *  const logTrace = useCallback(() => {
 *    logLogic.send({track: Date.now()})
 *  }, [])
 * }))
 * ```
 *
 * @description
 * * This hook works only for `sync` routes, any `async` routes will not work properly
 * * Don't forget to call `wrap` to ensure any computations will work properly
 */
export const useCallback = <TFunc extends Function>(
  fn: TFunc,
  dependencies: Dependencies
) => {
  const cache = getState<TFunc>();
  cache.kind = 'callback';

  if (isDiffers(cache.dependencies, dependencies)) {
    cache.value = fn;
    cache.dependencies = dependencies;
  }

  return cache.value;
};

export default useCallback;
