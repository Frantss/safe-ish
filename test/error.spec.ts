import { assertType, expect, it } from 'vitest';
import { safe_error } from '~/entries/prefixed';
import type { SafeError } from '~/src/types';

it('should return expected types', () => {
  const error = safe_error('code', { a: 1 }, 'message');

  assertType<false>(error.ok);

  assertType<string>(error.error.code);
  assertType<'code'>(error.error.code);

  assertType<string>(error.error.message);

  assertType<{ a: number }>(error.error.context);

  assertType<SafeError<'code', { a: number }>>(error);
});

it('should return expected error', () => {
  const error = safe_error('code', { a: 1 }, 'message');

  expect(error.ok).toBe(false);

  expect(error.error.code).toBe('code');
  expect(error.error.message).toBe('message');
  expect(error.error.context.a).toBe(1);
});
