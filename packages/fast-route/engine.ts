import { detect } from "@nanoexpress/platform-detection";
import ExtremeRouter, { param, regexParam, wildcard } from "extreme-router";
import FindMyWay from "find-my-way";

export type RouteMethod =
  | "GET"
  | "HEAD"
  | "OPTIONS"
  | "POST"
  | "PUT"
  | "PATCH"
  | "DELETE";

type GlobalContext = Record<string, unknown>;
type LocalContext = Record<string, unknown>;

export class Router<
  TCallback extends (
    globalContext: TGlobalContext,
    ctx: TLocalContext,
    params?: Record<string, unknown>
  ) => Promise<unknown> | unknown,
  TGlobalContext = GlobalContext,
  TLocalContext = LocalContext
> {
  private globalCtx: TGlobalContext;
  private router!: ExtremeRouter<{
    handler: Partial<Record<RouteMethod | "ALL", TCallback[]>>;
  }>;
  constructor(globalContext = {} as TGlobalContext) {
    this.globalCtx = globalContext as TGlobalContext;

    this._initialize();
  }
  private _initialize() {
    switch (detect()) {
      case "node":
      case "cloudflare-worker": {
        this.router = new ExtremeRouter({
          allowRegisterUpdateExisting: true,
          skipPluginValidation: true,
        });

        this.router.use(param).use(wildcard).use(regexParam);
        break;
      }
      case "bun": {
        const routes: Record<
          string,
          { handler: Partial<Record<RouteMethod | "ALL", TCallback[]>> }
        > = {};

        this.router = {} as never;
        this.router.register = function (path: string) {
          if (!routes[path]) {
            routes[path] = { handler: {} };
          }
          return routes[path];
        };
        this.router.unregister = function (path: string) {
          if (routes[path]) {
            routes[path] = null as never;

            return true;
          }
          return false;
        };
        const build_routes = () => {
          const local_routes: Bun.Serve.Routes<unknown, string> = {};

          for (const path in routes) {
            const { handler: methods } = routes[path];

            for (const method in methods) {
              if (!local_routes[path]) {
                local_routes[path] = {} as never;
              }

              const handlers = methods[method as RouteMethod];
              if (!handlers) {
                continue;
              }

              local_routes[path][method as RouteMethod] = async (
                req
              ): Promise<Response> => {
                const ctx: TLocalContext = {} as never;

                let response: Response;
                for (const handler of handlers) {
                  response = await handler(this.globalCtx, ctx, req);
                }

                return response;
              };
            }
          }

          return Bun.serve({ routes: local_routes });
        };
        this.router.match = function (path: string) {
          const serve = build_routes();

          return serve.fetch(path);
        };
        break;
      }
    }
  }
  private _method(
    type: RouteMethod | "ALL",
    routes: Array<string | TCallback>
  ) {
    if (routes.every((route) => typeof route === "function")) {
      const ref = this.router.register("/*");

      if (!ref.handler) {
        ref.handler = {};
      }

      if (!ref.handler[type]) {
        ref.handler[type] = [];
      }

      ref.handler[type].push(...routes);
    } else if (
      typeof routes[0] === "string" &&
      routes.slice(1).every((route) => typeof route === "function")
    ) {
      const [path, ..._routes] = routes as [string, ...T[]];
      const ref = this.router.register(path);

      if (!ref.handler) {
        ref.handler = {};
      }

      if (!ref.handler[type]) {
        ref.handler[type] = [];
      }

      ref.handler[type].push(..._routes);
    }

    return this;
  }
  use(...routes: Array<string | TCallback>) {
    return this._method("ALL", routes);
  }
  all(...routes: Array<string | TCallback>) {
    return this.use(...routes);
  }
  get(...routes: Array<string | TCallback>) {
    return this._method("GET", routes);
  }
  head(...routes: Array<string | TCallback>) {
    return this._method("HEAD", routes);
  }
  post(...routes: Array<string | TCallback>) {
    return this._method("POST", routes);
  }
  put(...routes: Array<string | TCallback>) {
    return this._method("PUT", routes);
  }
  patch(...routes: Array<string | TCallback>) {
    return this._method("PATCH", routes);
  }
  delete(...routes: Array<string | TCallback>) {
    return this._method("DELETE", routes);
  }

  /**
   * Match method
   */
  async match(method: RouteMethod, path: string) {
    const ref = this.router.match(path);

    if (!ref) {
      return false;
    }

    const handler = ref.handler;
    const handlers = handler[method];

    if (!handlers) {
      return false;
    }

    return true;
  }

  /**
   * Parse method
   */
  parse(method: RouteMethod, path: string) {
    const ref = this.router.match(path);

    if (!ref) {
      return false;
    }

    const handler = ref.handler;
    const handlers = handler[method];

    if (!handlers) {
      return false;
    }

    return ref.params;
  }

  /**
   * Lookup method
   */
  async lookup(method: RouteMethod, path: string) {
    const ref = await this.router.match(path);

    if (!ref) {
      return false;
    }

    const handler = ref.handler;
    const handlers = handler[method];

    if (!handlers) {
      return false;
    }

    const __ctx = this.globalCtx;
    const ctx: TLocalContext = {} as TLocalContext;

    for (let i = 0, len = handlers.length; i < len; i++) {
      await handlers[i](__ctx, ctx, ref.params);
    }
  }
}

const engine = new Router({
  database: { driver: "postgres" },
});

engine
  .use(async (globalContext) => {
    console.log("[RE] all middlewares", { globalContext });
  })
  .use("/static/*", async (globalContext) => {
    console.log("[RE] static middlewares", { globalContext });
  });

engine.get("/static/favicon.ico", async (globalContext) => {
  console.log("[RE] favicon ico", { globalContext });
});

engine.lookup("GET", "/static/favicon.ico");

if (typeof Bun !== "undefined") {
  const serve = Bun.serve({
    port: 32880,
    reusePort: true,
    routes: {
      "/*": (req) => {
        console.log("[BS] all middlewares");

        return new Response("all middlewares");
      },
      "/static/*": (_req) => {
        console.log("[BS] static middlewares");

        return new Response("static middlewares");
      },
      "/wc/*": (req) => {
        console.log("[BS] wildcard middlewares", { path: req.url });

        return new Response("wildcard middlewares " + req.url);
      },
      "/id/:id": (req) => {
        console.log("[BS] dynamic id middlewares", {
          path: req.url,
          id: req.params.id,
        });

        return new Response("dynamic id middlewares: " + req.params.id);
      },
      "/static/favicon.ico": {
        GET: (_req) => {
          console.log("[BS] favicon ico");

          return new Response("favicon ico");
        },
      },
    },
    fetch() {
      return new Response("Not found", { status: 404 });
    },
  });
  const mockUri = new URL(
    "/static/favicon.ico",
    `http://localhost:${serve.port}`
  );
  await fetch(mockUri.toString(), {
    method: "GET",
  });
}

const fmw = FindMyWay({
  defaultRoute() {
    return false;
  },
});

fmw.on("GET", "/*", () => {
  console.log("[FMW] all middlewares");
});
fmw.on("GET", "/static/*", () => {
  console.log("[FMW] static middlewares");
});
fmw.on("GET", "/static/favicon.ico", () => {
  console.log("[FMW] favicon ico");
});

fmw.lookup({ method: "GET", url: "/static/favicon.ico" } as never, {} as never);
