import type { Dependencies } from './utils/is-differs';

interface ICacheEntry<TValue = unknown> {
  dependencies: Dependencies;
  value: TValue;
  kind: 'callback' | 'effect' | 'memo';
}

const caches: Array<ICacheEntry> = [];
let index = 0;

export const getState = <TValue>() => {
  if (index >= caches.length) {
    caches.push({} as never);
  }
  return caches[index++] as ICacheEntry<TValue>;
};

export const reset = () => {
  index = 0;
};

export const dispose = () => {
  caches.length = 0;
  index = 0;
};
