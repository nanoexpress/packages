import type { MapKey } from './types.d.ts';

export const ORDER = {
  STATIC: 0,
  PARAMETER: 1,
  WILDCARD: 2,
  ARRAY: 3,
  REGEXP: 4
} as const;

export const REGEXP_MAP: Record<MapKey, RegExp> = {
  PARAMETER: /:/i,
  WILDCARD: /\*/i,
  ARRAY: /[{}]/i,
  REGEXP: /^\/(.*)\/$/i
};

export const HTTP_METHOD_ALL = 'ANY';

export const noop = () => {
  // noop
};
