import { build_route } from './build_route.ts';
import { HTTP_METHOD_ALL } from './constants.ts';
import type { BuildRoute } from './types';

/**
 * Packs layer into single-format object
 * @param path Layer path to be matched
 * @param handler Layer handler to be executed
 * @returns Packed layer
 */
export function build_layer<THandler>(
  path: string,
  handler: THandler
): BuildRoute<THandler> {
  return build_route(HTTP_METHOD_ALL as never, path, handler);
}
