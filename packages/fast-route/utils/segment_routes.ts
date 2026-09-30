import type { BuildRoute, BuildRouteWithSegments } from '../types.d.ts';
import segmentsSlice from 'fast-path-parse/utils/segment';

export function segment_routes<THandler>(routes: BuildRoute<THandler>[]) {
  return routes.map((route): BuildRouteWithSegments<THandler> => {
    const segments = segmentsSlice(route.path);

    return {
      ...route,
      segments
    };
  });
}
