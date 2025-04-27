import type { SafeResult } from "~/src/types";

export const result = <Data>(data: Data) => {
	return {
		ok: true,
		data,
	} satisfies SafeResult<Data> as SafeResult<Data>;
};
