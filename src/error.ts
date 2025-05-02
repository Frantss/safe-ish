import type { SafeishError } from '~/src/types';

/**
 * Creates a `SafeishError` object representing a failed outcome ("Err").
 * Prefer using the factory from `defineError` for consistency and effects.
 *
 * @param code The string identifier for the error.
 * @param context The contextual data for this error instance.
 * @param message The pre-formatted error message string.
 * @returns A `SafeishError` object.
 *
 * @example
 * ```typescript
 * const validationError = error(
 *   'VALIDATION_FAILED',
 *   { field: 'email' },
 *   'Invalid email format'
 * );
 * // { type: 'error', code: 'VALIDATION_FAILED', ... }
 * ```
 */
export const error = <Code extends string, Context>(
  code: Code,
  context: Context,
  message: string,
) => {
  return {
    ok: false,
    error: {
      code,
      context,
      message,
    },
  } satisfies SafeishError<Code, Context> as SafeishError<Code, Context>;
};
