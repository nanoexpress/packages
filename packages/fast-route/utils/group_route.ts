import { HTTP_METHOD_ALL } from '../constants.ts';
import type { BuildRoute, HttpMethod } from '../types.d.ts';

type RouteTree<THandler> = Record<string, THandler[]>;
type GroupTree<THandler> = Record<
  typeof HTTP_METHOD_ALL | HttpMethod,
  RouteTree<THandler>
>;

/**
 * Group routes into well-known structure
 * @param routes List of **sorted** routes
 * @returns Grouped/structured entries of routes
 */
export function group_route<THandler>(routes: BuildRoute<THandler>[]) {
  const group_of_routes: Partial<GroupTree<THandler>> = {
    [HTTP_METHOD_ALL]: {}
  };

  routes.forEach((route) => {
    const instance: RouteTree<THandler> = group_of_routes[route.method] || {};

    if (!group_of_routes[route.method]) {
      group_of_routes[route.method] = instance;
    }

    if (typeof route.path !== 'string') {
      throw new Error('RegExp route grouping is not supported yet');
    }

    if (!instance[route.path]) {
      instance[route.path] = [];
    }

    instance[route.path].push(route.handler);
  });

  return group_of_routes;
}
