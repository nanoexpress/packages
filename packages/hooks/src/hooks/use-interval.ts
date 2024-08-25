import type { Dependencies } from '../utils/is-differs';
import useEffect from './use-effect';

/**
 * `useInterval` hook
 * @param fn Callback to execute as effect at specified interval
 * @param interval Interval of how per specified time effect will be executed
 * @param dependencies Dependencies to compare
 * @example
 * ```ts
 * import { useInterval, wrap } from '@nanoexpress/hooks';
 *
 * app.get('/trace', wrap((req, res) => {
 *  useInterval(() => {
 *  // This effect will be called every 1000ms/1sec without any change
 *    logLogic.send({track: Date.now()})
 *  }, 1000, [])
 * }))
 * ```
 *
 * @description
 * * This hook works only for `sync` routes, any `async` routes will not work properly
 * * Don't forget to call `wrap` to ensure any computations will work properly
 */
const useInterval = <TFunc extends Function>(
  fn: TFunc,
  interval: number,
  dependencies: Dependencies
) =>
  useEffect(() => {
    let id: number;
    const _dispose = () => clearInterval(id);
    id = setInterval(fn as never, interval, _dispose) as never;
    return _dispose;
  }, dependencies);

export default useInterval;
