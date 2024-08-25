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

```js
import { wrap, useMemo } from "@nanoexpress/hooks";

const AnyFunc = wrap(() => {
  const dateNow = useMemo(
    () => ({
      now: Date.now(),
    }),
    []
  );

  console.log(dateNow.now); // it's cached, no updates, even function is re-calling
  assert.ok(dateNow.now !== Date.now(), "These values should differ");
});
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
