import type { Dependencies } from '../utils/is-differs';
import useEffect from './use-effect';

/**
 * `useTimeout` hook
 * @param fn Callback to execute as effect at specified timeout
 * @param timeout Delay ms of after specified time effect will be executed
 * @param dependencies Dependencies to compare
 * @example
 * ```ts
 * import { useTimeout, wrap } from '@nanoexpress/hooks';
 *
 * app.get('/trace', wrap((req, res) => {
 *  useTimeout(() => {
 *  // This effect will be called after 1000ms/1sec once
 *    logLogic.send({track: Date.now()})
 *  }, 1000, [])
 * }))
 * ```
 *
 * @description
 * * This hook works only for `sync` routes, any `async` routes will not work properly
 * * Don't forget to call `wrap` to ensure any computations will work properly
 */
const useTimeout = <TFunc extends Function>(
  fn: TFunc,
  timeout: number,
  dependencies: Dependencies
) =>
  useEffect(() => {
    let id: number;
    const _dispose = () => clearTimeout(id);
    id = setTimeout(fn as never, timeout, _dispose) as never;
    return _dispose;
  }, dependencies);

export default useTimeout;
