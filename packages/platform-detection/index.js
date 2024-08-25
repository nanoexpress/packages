const detect = () => {
  if (typeof Bun !== 'undefined') {
    return 'bun';
  } else if (
    typeof process !== 'undefined' &&
    process.release.name === 'node' &&
    typeof Bun === 'undefined'
  ) {
    return 'node';
  } else if (typeof Deno !== 'undefined') {
    return 'deno';
  } else if (typeof Netlify === 'object') {
    return 'netlify';
  } else if (typeof EdgeRuntime === 'string') {
    return 'edge-light';
  } else if (
    typeof navigator !== 'undefined' &&
    navigator?.userAgent === 'Cloudflare-Workers'
  ) {
    return 'cloudflare-worker';
  }
};

// Cached constants
const isBun = detect() === 'bun';
const isNode = detect() === 'node';
const isDeno = detect() === 'deno';
const isNetlify = detect() === 'netlify';
const isEdgeRuntime = detect() === 'edge-light';
const isCloudflareWorker = detect() === 'cloudflare-worker';

module.exports = {
  detect,
  is: {
    bun: isBun,
    node: isNode,
    deno: isDeno,
    netlify: isNetlify,
    edgeRuntime: isEdgeRuntime,
    cloudflareWorker: isCloudflareWorker
  }
};
