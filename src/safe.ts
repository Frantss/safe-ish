import { error } from "~/src/error";
import type { SafeError, SafeErrorDefinition, SafeOk } from "~/src/types";

const safe_unhandledCode = "~unhandled" as const;
type Safe_UnhandledCode = typeof safe_unhandledCode;

export const safe = <
	Input extends unknown[],
	Output extends
		| SafeOk<unknown>
		| SafeError<string, unknown>
		| SafeError<Safe_UnhandledCode, unknown>,
>(
	handler: (...args: Input) => Output,
	unhandled?: SafeErrorDefinition<Safe_UnhandledCode, unknown>,
) => {
	return (...args: Input) => {
		try {
			return handler(...args);
		} catch (e) {
			return (
				unhandled?.(e) ??
				error(safe_unhandledCode, e, "An unhandled error occurred")
			);
		}
	};
};
