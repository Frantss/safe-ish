import { error } from '~/src/error';
import type { SafeError, SafeErrorDefinition, SafeResult } from '~/src/types';

export const unhandledCode = '~unhandled' as const;
export type SafeUnhandledCode = typeof unhandledCode;

export const safe = <
  Input extends unknown[],
  Output extends
    | SafeResult<unknown>
    | SafeError<string, unknown>
    | SafeError<SafeUnhandledCode, unknown>,
  Unhandled extends SafeErrorDefinition<string, unknown> = SafeErrorDefinition<
    SafeUnhandledCode,
    unknown
  >,
>(
  handler: (...args: Input) => Output,
  unhandled?: Unhandled,
) => {
  return (...args: Input) => {
    try {
      return handler(...args);
    } catch (e) {
      return (unhandled?.(e) ??
        error(
          unhandledCode,
          e,
          'An unhandled error occurred',
        )) as unknown as ReturnType<Unhandled>;
    }
  };
};
