# @nanoexpress/bun-core

nanoexpress Core for Bun runtime

## Installation

```bash
npm install @nanoexpress/bun-core
# or
yarn install @nanoexpress/bun-core
# or
pnpm install @nanoexpress/bun-core
# or
bun add @nanoexpress/bun-core
```

## Usage

See [example](./example/basic.ts) for how it works

```ts
import { send } from '../aot' with { type: 'macro' };

const server = Bun.serve({
  async fetch(req) {
    // Below JSON becomes string which reduces `JSON.stringify` overhead for every request
    const { response, options } = send({ status: 'success' }, 200);
    return new Response(response, options);
  }
});

console.log(`Listening at ${server.port}`);

```

## License

MIT
