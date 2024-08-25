import useEffect from '../src/hooks/use-effect.js' with { type: 'micro' };
import useInterval from '../src/hooks/use-interval.js' with { type: 'micro' };
import useMemo from '../src/hooks/use-memo.js' with { type: 'micro' };
import useThreads from '../src/hooks/use-threads.js';
import useWorker from '../src/hooks/use-worker.js';
import { wrap } from '../src/wrap.js';

for (let i = 0; i < 5; i++) {
  wrap(() => {
    const queue = useThreads();

    useEffect(() => {
      console.log('effect?', queue);
      queue((threadId, isMainThread) => {
        const fib_values = [1, 2, 3];
        const fib = (fib_val = fib_values, max = 500) => {
          const prev = fib_val[fib_val.length - 1];
          const prev2 = fib_val[fib_val.length - 2];

          const curr = prev2 + prev;

          if (curr < max) {
            fib_val.push(curr);
          } else {
            return curr;
          }

          return fib(fib_val, max);
        };
        return fib();
      })
        .then(console.log.bind(console.log, '[useThreads]', 'Fibonacci'))
        .catch(console.err);
    }, [queue]);

    useInterval(
      (dispose) => {
        setTimeout(dispose, 100);
        console.log('interval');
      },
      100,
      [useMemo(() => Date.now(), [])]
    );

    const worker = useWorker(({ workerData, parentPort }) => {
      const fib_values = [1, 2];
      const fib = (fib_val = fib_values, max = 500) => {
        const prev = fib_val[fib_val.length - 1];
        const prev2 = fib_val[fib_val.length - 2];

        const curr = prev2 + prev;

        if (curr < max) {
          fib_val.push(curr);
        } else {
          return curr;
        }

        return fib(fib_val, max);
      };
      console.log('[useWorker] Fibonacci', fib());
    }, []);
  });
}
