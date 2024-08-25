import useMemo from './use-memo.js';

/**
 * `useRef` hook
 * @param current Initial `ref` to store
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
const useRef = <TRef>(current: TRef) => useMemo(() => ({ current }), []);

export default useRef;
