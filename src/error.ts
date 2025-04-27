import type { SafeishError } from '~/src/types';

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
