/**
 *
 * @param input Data for input
 * @param status Response status
 * @param headers Response headers
 * @returns Complete object pack of `response string`, `status` code and headers
 * @example
 * ```ts
 * import { send } from '@nanoexpress/bun-core/aot' with { type: 'macro' };
 *
 * app.get('/health', () => {
 *  return send({status: 'ok'})
 * });
 * ```
 * @description
 * * Only static input are will be compiled
 * * Dynamic data such as `database`, `datetime` and other are should not be used
 */
export const send = <TBody>(
  input: TBody,
  status = 200,
  headers: Record<string, string | number | boolean> = {}
): { response: string; options: RequestInit & { status: number } } => {
  if (typeof input === 'object') {
    return {
      response: JSON.stringify(input),
      options: {
        status,
        headers: { ...headers, 'content-type': 'application/json' }
      }
    };
  } else if (typeof input === 'string') {
    return {
      response: input,
      options: {
        status,
        headers: { ...headers, 'content-type': 'application/json' }
      }
    };
  } else if (typeof input === 'number' || typeof input === 'boolean') {
    return {
      response: String(input),
      options: {
        status,
        headers: { ...headers, 'content-type': 'application/json' }
      }
    };
  }

  return {
    response: 'Invalid response',
    options: {
      status: 403,
      headers: { 'content-type': 'text/plain' }
    }
  };
};
