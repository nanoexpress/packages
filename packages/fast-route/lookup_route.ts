import { build_route } from "./build_route.ts";
import { HTTP_METHOD_ALL, ORDER } from "./constants.ts";
import type { BuildRoute, HttpMethod } from "./types";
import { group_route } from "./utils/group_route.ts";
import { segment_routes } from "./utils/segment_routes.ts";
import { sort_routes } from "./utils/sort_routes.ts";

export function lookup_route<THandler extends (...args: any[]) => any>(
  ...routes: BuildRoute<THandler>[]
) {
  const all_routes = sort_routes(routes);
  const grouped_routes = group_route(routes);
  const segmented_routes = segment_routes(all_routes);

  return function route_handler(method: HttpMethod, pathname: string) {
    const structure = grouped_routes[method || HTTP_METHOD_ALL];

    for (let r = 0, len_r = segmented_routes.length; r < len_r; r++) {
      const route = segmented_routes[r];

      switch (route.order) {
        case ORDER.STATIC: {
          if (route.path === pathname) {
            const handlers = structure?.[pathname];
            let callback;

            if (!handlers) {
              return;
            }

            for (let i = 0, len = handlers.length; i < len; i++) {
              callback = handlers[i]();
            }

            return callback;
          }

          break;
        }
        case ORDER.PARAMETER: {
          let all_match = true;
          let callback;

          if (route.method === method) {
            for (let s = 0, len_s = route.segments.length; s < len_s; s++) {
              const {
                name,
                segment: is_segment,
                position,
                size,
                last,
              } = route.segments.segments[s];

              if (is_segment) {
                if (last) {
                  all_match =
                    all_match && pathname.substring(position).length > 0;
                } else {
                  const nextIndex = pathname.indexOf("/", position + 1);

                  all_match =
                    all_match &&
                    pathname.substring(position, nextIndex).length > 0;
                }
              } else {
                all_match =
                  all_match &&
                  pathname.substring(position, position + size) === name;
              }
            }

            if (all_match) {
              const handlers = structure?.[route.path];

              if (!handlers) {
                return;
              }

              for (let i = 0, len = handlers.length; i < len; i++) {
                callback = handlers[i]();
              }

              return callback;
            }
          }

          break;
        }
        case ORDER.WILDCARD: {
          console.log("not supports yet");

          break;
        }
        case ORDER.ARRAY: {
          console.log("not supports yet");

          break;
        }
        case ORDER.REGEXP: {
          console.log(route.path);

          break;
        }
        default: {
          break;
        }
      }
    }
  };
}

console.log(
  lookup_route<(...args: any[]) => any>(
    build_route("GET", "/foo", () => {
      console.log("all shit");
    }),
    build_route("GET", "/foo", () => {
      return "/foo executed";
    }),
    build_route("GET", "/foo/:id", ({ id }) => {
      return `/foo/${id} executed`;
    })
  )("GET", "/foo")
);
