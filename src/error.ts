import type { SafeError } from '~/src/types';

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
  } satisfies SafeError<Code, Context> as SafeError<Code, Context>;
};
