import { describe, expect, test } from 'bun:test';
import { Number, Object } from '@sinclair/typebox';
import { Check } from '@sinclair/typebox/value';
import { send } from './aot.ts';

describe('@nanoexpress/bun-core', () => {
  test('aot send serializes JSON responses', () => {
    const result = send({ ok: true }, 201, { 'x-smoke': '1' });

    expect(result.response).toBe('{"ok":true}');
    expect(result.options.status).toBe(201);
    expect(result.options.headers).toMatchObject({
      'content-type': 'application/json',
      'x-smoke': '1'
    });
  });

  test('typebox schema validation works', () => {
    const schema = Object({ input: Number() });

    expect(Check(schema, { input: 1 })).toBe(true);
    expect(Check(schema, { input: 'not-a-number' })).toBe(false);
  });
});
