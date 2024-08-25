# @nanoexpress/hooks

**\[EXPERIMENTAL\]** Hooks for nanoexpress and anywhere

## Features

- Fast performance
- React.js Hooks like behavior `[1]`
- No dependency
- Works everywhere

## Installation

```bash
npm install @nanoexpress/hooks
# or
yarn install @nanoexpress/hooks
# or
pnpm install @nanoexpress/hooks
# or
bun add @nanoexpress/hooks
```

## Usage

See [example](./example/test.js) for how it works

```js
import { wrap, useMemo } from "@nanoexpress/hooks";

const MyFunction = wrap(() => {
  const dateNow = useMemo(
    () => ({
      now: Date.now(),
    }),
    []
  );

  console.log(dateNow.now); // it's cached, no updates, even function is re-calling
  assert.ok(dateNow.now !== Date.now(), "These values should differ");
});

MyFunction();
MyFunction();
MyFunction();
```

or for **nanoexpress**

```js
import { wrap, useEffect } from "@nanoexpress/hooks";
import nanoexpress from "@nanoexpress/node";

const app = nanoexpress();

app.get(
  "/",
  wrap((req, res) => {
    useEffect(() => {
      // This runs once first request to this route called
      // If first user already called, 3rd user does not get it's called
      // Useful for SQL calls which keeps same pool across requests
    }, []);
    useEffect(() => {
      // Apply logic for per user and it does not change for same user
      // Re-runs once other user are calls this route but thus caching
    }, [req.headers["x-user-id"]]);
  })
);

app.listen(3000);
```

## Hooks

- `useEffect`
- `useMemo`
- `useCallback`
- `useRef`
- `useInterval`
- `useTimeout`
- `useWorker`
- `useThreads`

## Notice

- `1` - Like React.js Hooks, `async` functions calling could make Hooks out-of-order and make more bugs than this library can solve
