import { assert, assertType, expect, it } from 'vitest';
import {
  safeish_defineError,
  safeish_result,
  safeish_safe,
} from '~/entries/prefixed';
import type { SafeishResult } from '~/src/types';

it('should return a result when no error is thrown or returned', () => {
  const caller = safeish_safe((a: number, b: number) => {
    return safeish_result(a + b);
  });

  const result = caller(1, 2);

  assert(!!result.ok);

  assertType<SafeishResult<number>>(result);

  expect(result.data).toBe(3);
});

it('should return an error when an unhandled error is thrown', () => {
  const caller = safeish_safe((a: number, b: number) => {
    throw 'failed';
  });

  const result = caller(1, 2);

  assert(!result.ok);

  assertType<unknown>(result.error.context);
  assertType<string>(result.error.message);

  expect(result.error.code).toBe('~unhandled');
  expect(result.error.context).toBe('failed');
});

it('should return a custom error when it is returned', () => {
  const error = safeish_defineError({
    code: 'code',
    message: (context: { message: string }) => context.message,
  });
  const caller = safeish_safe((a: number, b: number) => {
    return error({ message: 'message' });
  });

  const result = caller(1, 2);

  assert(!result.ok);

  assertType<'code' | '~unhandled'>(result.error.code);
  assertType<unknown>(result.error.context);
  assertType<string>(result.error.message);

  assert(result.error.code === 'code');
  expect(result.error.message).toBe('message');

  assertType<{ message: string }>(result.error.context);
});

it('returns custom error as unhandled if passed in second argument', () => {
  const error = safeish_defineError({
    code: 'code',
    message: (context: unknown) => `${context}`,
  });
  const caller = safeish_safe((a: number, b: number) => {
    throw 'failed';
  }, error);

  const result = caller(1, 2);

  assert(!result.ok);

  assertType<'code'>(result.error.code);
  assertType<unknown>(result.error.context);
  assertType<string>(result.error.message);

  expect(result.error.code).toBe('code');
  expect(result.error.message).toBe('failed');
  expect(result.error.context).toBe('failed');
});
