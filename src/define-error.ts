import { error } from "~/src/error";
import type { SafeErrorDefinition } from "~/src/types";

export const defineError = <const Code extends string, Context = undefined>({
	code,
	message,
}: { code: Code; message: (context: Context) => string }) => {
	const builder = (context: Context) => {
		return error(code, context, message(context));
	};

	builder.code = code;
	builder.message = message;
	builder.$context = {} as unknown as Context;

	return builder as unknown as SafeErrorDefinition<Code, Context>;
};
