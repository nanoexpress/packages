import { send } from '../aot' with { type: 'macro' };

const server = Bun.serve({
  async fetch(req) {
    const url = new URL(req.url);

    if (url.pathname === '/json' && req.method === 'GET') {
      // Below JSON becomes string which reduces `JSON.stringify` overhead for every request
      const { response, options } = send({ data: { input: 1 } });

      return new Response(response, options);
    }

    // Below JSON becomes string which reduces `JSON.stringify` overhead for every request
    const { response, options } = send({ status: 'error' }, 404);
    return new Response(response, options);
  }
});

console.log(`Listening at ${server.port}`);
