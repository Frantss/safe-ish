import { error } from '~/src/error';
import type { SafeishErrorDefinition } from '~/src/types';

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
