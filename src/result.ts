import type { SafeOk } from "./types";

export const result = <Data>(data: Data) => {
	return {
		ok: true,
		data,
	} satisfies SafeOk<Data> as SafeOk<Data>;
};
