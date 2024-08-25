declare type Runtime =
  | 'bun'
  | 'node'
  | 'deno'
  | 'netlify'
  | 'edge-light'
  | 'cloudflare-worker'
  | undefined;

declare function detect(): Runtime;

declare const is = {
  bun: true,
  node: true,
  deno: true,
  netlify: true,
  edgeRuntime: true,
  cloudflareWorker: true
};

export { Runtime, detect, is };
