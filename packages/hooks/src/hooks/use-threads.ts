import { Worker } from 'node:worker_threads';
import useMemo from './use-memo.js';
import useCallback from './use-callback.js';
import { cpus } from 'os';
import { randomUUID, createHash } from 'node:crypto';

function workerFunction(this: Worker) {
  const { parentPort, threadId } = require('worker_threads');

  parentPort.on(
    'message',
    async ({ data, id, payload }: Record<string, unknown>) => {
      const raw = `return (${data})(${threadId}, false, payload)`;

      // @ts-ignore
      if (typeof self !== 'undefined') {
        // @ts-ignore
        self.payload = payload;
      }
      try {
        const result = new Function(raw)();

        parentPort.postMessage({ done: id, result });
      } catch (e) {
        parentPort.postMessage({ error: id, e });
      }
      // @ts-ignore
      if (typeof self !== 'undefined') {
        // @ts-ignore
        self.payload = null;
      }
    }
  );
}

const workers = cpus().map(() => {
  const status = { busy: false };

  const workerFn = `(${workerFunction.toString()})()`;
  const worker = new Worker(workerFn, {
    eval: true
  });
  return { worker, status };
});

interface IQueue {
  handler: Function;
  payload: unknown;
  resolve: typeof Promise.resolve;
  reject: typeof Promise.reject<unknown>;
  hash: string;
}

/**
 * `useThreads` hook
 * @example
 * ```ts
 * import { useThreads, wrap } from '@nanoexpress/hooks';
 *
 * app.get('/user/:id', wrap((req, res) => {
 *  const queue = useThreads();
 *
 *  queue((threadId, isMainThread) => {
 *    console.log({threadId, isMainThread})
 *
 *    someExpensiveCalculationOnWorker();
 *
 *    return { status: 'success' }
 *  }).then(res => console.log(res))
 * ```
 *
 * @description
 * * This hook works only for `sync` routes, any `async` routes will not work properly
 * * Don't forget to call `wrap` to ensure any computations will work properly
 */
const useThreads = () => {
  const queue = useMemo<IQueue[]>(() => [], []);

  const handler = useCallback(
    function workerHandler() {
      workers.forEach((instance) => {
        const { worker, status } = instance;
        if (!status.busy) {
          const stack = queue.shift();
          const id = randomUUID();
          if (stack) {
            const { handler, payload, resolve, reject } = stack;
            status.busy = true;
            worker.postMessage({
              data: handler.toString(),
              id,
              payload
            });
            worker.on(
              'message',
              function workerMessage({ error, e, done, result }) {
                if (done === id) {
                  status.busy = false;
                  resolve(result);
                } else if (error === id) {
                  status.busy = false;
                  reject(e);
                }
                workerHandler();
                worker.off('message', workerMessage);
              }
            );
          }
        }
      });
    },
    [queue.map((q) => q.hash).join('_')]
  );

  return useCallback<
    <TResponse, TPayload>(
      func: (
        threadId: number,
        isMainThread: boolean,
        payload?: TPayload
      ) => TResponse,
      payload?: TPayload
    ) => Promise<TResponse>
  >(
    (func, payload) =>
      new Promise((resolve, reject) => {
        queue.push({
          handler: func,
          payload,
          // @ts-ignore
          resolve,
          // @ts-ignore
          reject,
          hash: createHash('sha256').update(func.toString()).digest('hex')
        });
        handler();
      }),
    [queue.map((q) => q.hash).join('_'), handler.toString()]
  );
};

export default useThreads;
