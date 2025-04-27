export type SafeishResult<Data> = {
  ok: true;
  data: Data;
};

export type SafeishError<Code extends string, Context> = {
  ok: false;
  error: { code: Code; context: Context; message: string };
};

export type SafeishErrorDefinition<
  Code extends string,
  Context,
> = Context extends undefined
  ? {
      (): SafeishError<Code, Context>;
      code: Code;
      message: () => string;
      $context: undefined;
    }
  : {
      (context: Context): SafeishError<Code, Context>;
      code: Code;
      message: (context: Context) => string;
      $context: Context;
    };
