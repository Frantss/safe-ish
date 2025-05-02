import { error } from '~/src/error';
import type { SafeishErrorDefinition } from '~/src/types';

/**
 * Defines a blueprint for creating specific `SafeishError` instances consistently.
 * Encapsulates code, message generation, and optional side effects.
 *
 * @param options - Configuration object for the error definition.
 * @param options.code - Unique string identifier for this error type.
 * @param options.message - Function taking context (`Context`) to generate an error message.
 * @param [options.effect] - Optional side effect function (e.g., logging) called on error creation.
 * @returns A `SafeishErrorDefinition` object with an `error` factory function.
 *
 * @example
 * ```typescript
 * const UserNotFoundError = defineError({
 *   code: 'USER_NOT_FOUND',
 *   message: (ctx: { userId: number }) => `User ${ctx.userId} not found.`,
 *   effect: (ctx) => console.error('Error:', ctx)
 * });
 * const notFoundError = UserNotFoundError({ userId: 123 });
 * // { type: 'error', code: 'USER_NOT_FOUND', ... }
 * ```
 */
export const defineError = <const Code extends string, Context = undefined>({
  code,
  message,
  effect,
}: {
  code: Code;
  message: (context: Context) => string;
  effect?: (context: NoInfer<Context>) => void | Promise<void>;
}) => {
  const builder = (context: Context) => {
    if (effect) effect(context);

    return error(code, context, message(context));
  };

  builder.code = code;
  builder.message = message;
  builder.$context = {} as unknown as Context;

  return builder as unknown as SafeishErrorDefinition<Code, Context>;
};
