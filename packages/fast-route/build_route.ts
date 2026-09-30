import { ORDER, REGEXP_MAP } from './constants.ts';
import type { BuildRoute, HttpMethod, MapKey, ValueOf } from './types';

/**
 * Packs route into single-format object
 * @param method Route method to be matched
 * @param path Route path to be matched
 * @param handler Route handler to be executed
 * @returns Packed route
 */
export function build_route<THandler>(
  method: HttpMethod,
  path: string,
  handler: THandler
): BuildRoute<THandler> {
  let typeName: keyof typeof REGEXP_MAP;
  let type: BuildRoute<THandler>['type'] = 'static';
  let order: ValueOf<typeof ORDER> = ORDER.STATIC;

  for (typeName in REGEXP_MAP) {
    const regex = REGEXP_MAP[typeName];

    if (regex.test(path)) {
      type = typeName.toLowerCase() as Lowercase<MapKey>;
      order = ORDER[typeName];
    }
  }

  return {
    order,
    type,
    method,
    path,
    handler
  };
}
