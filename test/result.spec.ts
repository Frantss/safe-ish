import { assertType, expect, it } from 'vitest';
import { safeish_result } from '~/entries/prefixed';
import type { SafeishResult } from '~/src/types';

it('should return expected types', () => {
  const result = safeish_result({ a: 1 });

  assertType<true>(result.ok);

  assertType<{ a: number }>(result.data);

  assertType<SafeishResult<{ a: number }>>(result);
});

it('should return expected result', () => {
  const error = safeish_result({ a: 1 });

  expect(error.ok).toBe(true);

  expect(error.data.a).toBe(1);
});
