export type SafeResult<Data> = {
	ok: true;
	data: Data;
};

export type SafeError<Code extends string, Context> = {
	ok: false;
	error: { code: Code; context: Context; message: string };
};

export type SafeErrorDefinition<
	Code extends string,
	Context,
> = Context extends undefined
	? {
			(): SafeError<Code, Context>;
			code: Code;
			message: () => string;
			$context: undefined;
		}
	: {
			(context: Context): SafeError<Code, Context>;
			code: Code;
			message: (context: Context) => string;
			$context: Context;
		};
