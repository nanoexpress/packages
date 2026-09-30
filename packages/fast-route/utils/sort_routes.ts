import type { BuildRoute } from '../types.ts';

/**
 * Sorts packed routes by order/priority
 * @param routes Array of packed routes
 * @returns Copy of sorted packed routes. Original packed routes remains untouched
 */
export function sort_routes<THandler>(routes: BuildRoute<THandler>[]) {
  return routes.slice(0).sort((a, b) => a.order - b.order);
}
