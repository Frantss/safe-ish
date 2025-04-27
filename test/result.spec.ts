import { assertType, expect, it } from "vitest";
import { safe_result } from "~/entries/prefixed";
import type { SafeResult } from "~/src/types";

it("should return expected types", () => {
	const result = safe_result({ a: 1 });

	assertType<true>(result.ok);

	assertType<{ a: number }>(result.data);

	assertType<SafeResult<{ a: number }>>(result);
});

it("should return expected result", () => {
	const error = safe_result({ a: 1 });

	expect(error.ok).toBe(true);

	expect(error.data.a).toBe(1);
});
