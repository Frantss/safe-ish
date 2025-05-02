import type { SafeishResult } from '~/src/types';

/**
 * Creates a `SafeishResult` object representing a successful outcome ("Ok").
 * `Data` is the type of the success payload.
 *
 * @param data The successful data payload.
 * @returns A `SafeishResult` object containing the data.
 *
 * @example
 * ```typescript
 * const userResult = result({ id: 1, name: "Alice" });
 * // { type: 'result', data: { id: 1, name: "Alice" } }
 * ```
 */
export const result = <Data>(data: Data) => {
  return {
    ok: true,
    data,
  } satisfies SafeishResult<Data> as SafeishResult<Data>;
};
