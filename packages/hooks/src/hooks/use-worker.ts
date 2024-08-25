import useEffect from './use-effect';
import { Worker } from 'node:worker_threads';
import useRef from './use-ref';
import type { Dependencies } from '../utils/is-differs';

/**
 * `useWorker` hook
 * @param fn Callback to execute as worker function
 * @param dependencies Dependencies to compare
 * @example
 * ```ts
 * import { useWorker, wrap } from '@nanoexpress/hooks';
 *
 * app.get('/user/:id', wrap((req, res) => {
 *  useWorker(({workerData}) => {
 *  // This worker will be called once until `dependencies` aren't changed
 *    db.updateUser({id: workerData[0]}, {updated_at: Date.now()})
 *  }, [req.params.id])
 * }))
 * ```
 *
 * @description
 * * This hook works only for `sync` routes, any `async` routes will not work properly
 * * Don't forget to call `wrap` to ensure any computations will work properly
 */
const useWorker = <TFunc extends Function>(
  fn: TFunc,
  dependencies: Dependencies
) => {
  const worker = useRef<Worker | null>(null);

  useEffect(() => {
    worker.current = new Worker(
      `const worker = require('worker_threads');
    (${fn.toString()})({...worker})
    `,
      { eval: true, workerData: dependencies }
    );

    return () => {
      worker.current?.terminate();
    };
  }, dependencies);

  return worker.current;
};

export default useWorker;
