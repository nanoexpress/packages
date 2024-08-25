import { getState } from '../constants';
import isDiffers, { type Dependencies } from '../utils/is-differs';

/**
 * `useMemo` hook
 * @param fn Callback to execute and cache result
 * @param dependencies Dependencies to compare
 * @example
 * ```ts
 * import { useMemo, wrap } from '@nanoexpress/hooks';
 *
 * app.get('/trace', wrap((req, res) => {
 *  const { response } = useMemo(() => {
 *    // Some expensive `sync` calculations like calculating `fibonacci`
 *
 *    return { response: resultofCalculations }
 * }, []))
 * ```
 *
 * @description
 * * This hook works only for `sync` routes, any `async` routes will not work properly
 * * Don't forget to call `wrap` to ensure any computations will work properly
 */
const useMemo = <T>(fn: () => T, dependencies: Dependencies): T => {
  const cache = getState<T>();
  cache.kind = 'memo';

  if (isDiffers(cache.dependencies, dependencies)) {
    cache.value = (fn as Function)();
    cache.dependencies = dependencies;
  }

  return cache.value;
};
export default useMemo;
