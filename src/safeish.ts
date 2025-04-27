import { error } from '~/src/error';
import type {
  SafeishError,
  SafeishErrorDefinition,
  SafeishResult,
} from '~/src/types';

export const unhandledCode = '~unhandled' as const;
export type SafeishUnhandledCode = typeof unhandledCode;

export const safeish = <
  Input extends unknown[],
  Output extends
    | SafeishResult<unknown>
    | SafeishError<string, unknown>
    | SafeishError<SafeishUnhandledCode, unknown>,
  Unhandled extends SafeishErrorDefinition<
    string,
    unknown
  > = SafeishErrorDefinition<SafeishUnhandledCode, unknown>,
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
