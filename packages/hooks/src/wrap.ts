import { reset, dispose } from './constants.js';

/**
 * `wrap` function wrapper
 * @param fn The function which should be executed
 * @example
 * ```ts
 * import { useRef, wrap } from '@nanoexpress/hooks';
 *
 * app.get('/trace', wrap((req, res) => {
 *  const ref = useRef(Symbol('REF4'));
 *
 *  ref.current // Stays same across requests
 * });
 * ```
 *
 * @description
 * * This hook works only for `sync` routes, any `async` routes will not work properly
 * * Don't forget to call `wrap` to ensure any computations will work properly
 */
export const wrap = <TFunc extends Function>(fn: TFunc) => {
  const result = fn();
  reset();

  return result;
};

export { dispose };
