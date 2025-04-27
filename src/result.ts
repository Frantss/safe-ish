import type { SafeOk } from "~/src/types";

export const result = <Data>(data: Data) => {
	return {
		ok: true,
		data,
	} satisfies SafeOk<Data> as SafeOk<Data>;
};
