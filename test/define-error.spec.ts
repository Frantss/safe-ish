import { assertType, expect, it, test } from 'vitest';
import { safe_defineError } from '~/entries/prefixed';

it('should return expected types when message lacks a context argument', () => {
  const error = safe_defineError({
    code: 'code',
    message: () => 'message',
  });

  assertType<string>(error.code);
  assertType<'code'>(error.code);

  assertType<string>(error.message());

  assertType<undefined>(error.$context);
});

it('should return expected types when message has a context argument', () => {
  const error = safe_defineError({
    code: 'code',
    message: (context: { message: string }) => context.message,
  });

  assertType<string>(error.code);
  assertType<'code'>(error.code);

  assertType<string>(error.message({ message: 'test' }));

  assertType<{ message: string }>(error.$context);
});

test('defined error should return expected error', () => {
  const error = safe_defineError({
    code: 'code',
    message: () => 'message',
  });

  const instance = error();

  expect(instance.ok).toBe(false);

  expect(instance.error.code).toBe('code');
  expect(instance.error.message).toBe('message');
  expect(instance.error.context).toBeUndefined();
});

test('defined error should return expected error with context', () => {
  const error = safe_defineError({
    code: 'code',
    message: (context: { message: string }) => context.message,
  });

  const instance = error({ message: 'message' });

  expect(instance.ok).toBe(false);

  expect(instance.error.code).toBe('code');
  expect(instance.error.message).toBe('message');
  expect(instance.error.context.message).toBe('message');
});
